---
title: Discriminating Unions and Type Narrowing
date: '2024-01-31'
tags: ['pydantic', 'typing', 'python']
draft: false
summary: Determining a type by its properties
---

A discriminating union is a union of types that can be identified by one or more of their properties, or discriminator(s).
These discriminators are often literal values or type guards.

In this post I'll provide some examples using type narrowing in Python before moving on to an example using
discriminating unions in Pydantic to parse .env files.

## Basic example

Take a look at the following code where we have two datastructures. Both structures have the property `security_protocol`,
which is the discriminator. The other properties are different and not shared between the datastructures.

```python
from pathlib import Path
from typing import Literal, TypeAlias


class SSLAuthentication:
    security_protocol: Literal["SSL"]
    certificate_location: Path


class SASLSSLAuthentication:
    security_protocol: Literal["SASL_SSL"]
    sasl_mechanism: Literal["PLAIN", "GSSAPI"]


Authentication: TypeAlias = SSLAuthentication | SASLSSLAuthentication
```

It's easy to narrow down the type using the builtin isinstance function, this will also provide the correct code completions
for the corresponding type.

```python
def do_something(auth: Authentication) -> str:
    if isinstance(auth, SSLAuthentication):
        return auth.certificate_location.name
    elif isinstance(auth, SASLSSLAuthentication):
        return auth.sasl_mechanism
```

But sometimes you want to check the type based on something else, for example a property value.
You won't get much type hinting by simply using _Equality Narrowing_ on `Authentication.security_protocol`, unlike with TypeScript for example.
While writing the following function your IDE will not give you any narrowed down type hints. When you dot into the
properties of `auth` on line 2, you'll still see `sasl_mechanism` which is not a property of `SSLAuthentication`.

```python
def do_something(auth: Authentication) -> str:
    if auth.security_protocol == "SSL":
        return auth.certificate_location.name
    elif auth.security_protocol == "SASL_SSL":
        return auth.sasl_mechanism
```


## Type guards

This is where a user defined type guard is useful. `TypeGuard` was introduced in Python 3.10 via [PEP 647](https://peps.python.org/pep-0647/).
When a function has return type `TypeGuard[int]` and the return value is `True`, it is expected that the type is actually an `int`.
By adding a user defined `TypeGuard` to the function you will get proper code completion and type hinting when narrowing down
a type by property values.

```python
from typing import TypeGuard


def is_ssl(auth: Authentication) -> TypeGuard[SSLAuthentication]:
    return auth.security_protocol == "SSL"


def is_sasl(auth: Authentication) -> TypeGuard[SASLSSLAuthentication]:
    return auth.security_protocol == "SASL_SSL"


def do_something_better(auth: Authentication) -> str:
    if is_ssl(auth):
        return auth.certificate_location.name
    elif is_sasl(auth):
        return auth.sasl_mechanism
```

This becomes even more useful when we split the `SASLSSLAuthentication` class by `sasl_mechanism` into two new classes.

```python
class PlainAuthentication:
    security_protocol: Literal["SASL_SSL"]
    sasl_mechanism: Literal["PLAIN"]


class GSSAPIAuthentication:
    security_protocol: Literal["SASL_SSL"]
    sasl_mechanism: Literal["GSSAPI"]


Authentication: TypeAlias = (
    SSLAuthentication | PlainAuthentication | GSSAPIAuthentication
)

def is_plain(auth: Authentication) -> TypeGuard[SASLSSLAuthentication]:
    return auth.security_protocol == "SASL_SSL" and auth.sasl_mechanism == "PLAIN"


def is_gssapi(auth: Authentication) -> TypeGuard[GSSAPIAuthentication]:
    return auth.security_protocol == "SASL_SSL" and auth.sasl_mechanism == "GSSAPI"
```

## Discriminating unions

Pydantic introduces a simple way to do this by specifying a discriminator on a field. This reduces the amount
of code you have to write yourself, which improves maintainability should you ever add more authentication methods.

There are two ways of using a discriminator with Pydantic. The most simple way is by providing the name of the property
to the `discriminator` kwarg in a `Field` constructor.

```shell
Authentication: TypeAlias = SSLAuthentication | PlainAuthentication | GSSAPIAuthentication

class Client(BaseModel):
    auth: Authentication = Field(..., discriminator="security_protocol")
```

This will only discriminate by one property though, so you will not know if it is `PlainAuthentication` or `GSSAPIAuthentication`.
The second way of using a discriminating union, by using `Annotated` and `Discriminator`, makes that possible.

```python
from typing import Annotated, TypeAlias
from pydantic import BaseModel, ConfigDict, Discriminator

SASLAuthentications: TypeAlias = PlainAuthentication | GSSAPIAuthentication


class Client(BaseModel):
    auth: Annotated[
        SSLAuthentication | Annotated[
            SASLAuthentications,
            Discriminator("sasl_mechanism")
        ],
        Discriminator("security_protocol")
    ]

    model_config = ConfigDict(
        extra="ignore"
    )
```

It's especially useful when using Pydantic to validate user data, for example from and `.env` file using `Pydantic Settings`.
You won't have to write logic to instantiate certain authentication methods by checking values yourself, this will all be
done automatically.

## Env file example

Take a look at the following script. It defines a `Settings` model which has a property `auth`, its type is a discriminating
union. When instantiated the `Settings` model will read the `.env` file and populate its `auth` property depending on the values
in that file. Below the script you'll find three sets of input/output to demonstrate that this simple code can handle multiple
user input settings without adding any logic yourself.

```python
from pathlib import Path
from typing import TypeAlias, Literal, Annotated

from pydantic import BaseModel, Discriminator
from pydantic_settings import BaseSettings, SettingsConfigDict


class SSLAuthentication(BaseModel):
    security_protocol: Literal["SSL"]
    certificate_location: Path
    whatami: str = "I am SSLAuthentication"


class PlainAuthentication(BaseModel):
    security_protocol: Literal["SASL_SSL"]
    sasl_mechanism: Literal["PLAIN"]
    whatami: str = "I am PlainAuthentication"


class GSSAPIAuthentication(BaseModel):
    security_protocol: Literal["SASL_SSL"]
    sasl_mechanism: Literal["GSSAPI"]
    whatami: str = "I am GSSAPIAuthentication"


SASLSSLAuthentication: TypeAlias = PlainAuthentication | GSSAPIAuthentication


class Settings(BaseSettings):
    title: str
    auth: Annotated[
        SSLAuthentication | Annotated[
            SASLSSLAuthentication,
            Discriminator("sasl_mechanism")
        ],
        Discriminator("security_protocol")
    ]

    model_config = SettingsConfigDict(
        case_sensitive=False,
        env_file=".env",
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
        env_prefix="blog_",
        extra="ignore",
    )


if __name__ == "__main__":
    settings = Settings()
    print(settings.model_dump_json(indent=4))
```

### Env SSL
```shell
BLOG_TITLE="Discriminating Unions"
BLOG_AUTH__SECURITY_PROTOCOL="SSL"
BLOG_AUTH__CERTIFICATE_LOCATION="/home/ca.crt"
```

### Output SSL
```json
{
    "title": "Discriminating Unions",
    "auth": {
        "security_protocol": "SSL",
        "certificate_location": "/home/ca.crt",
        "whatami": "I am SSLAuthentication"
    }
}
```

### Env SASL_SSL, Plain
```shell
BLOG_TITLE="Discriminating Unions"
BLOG_AUTH__SECURITY_PROTOCOL="SASL_SSL"
BLOG_AUTH__SASL_MECHANISM="PLAIN"
```

### Output SASL_SSL, Plain
```json
{
    "title": "Discriminating Unions",
    "auth": {
        "security_protocol": "SASL_SSL",
        "sasl_mechanism": "PLAIN",
        "whatami": "I am PlainAuthentication"
    }
}
```

### Env SASL_SSL, Plain
```shell
BLOG_TITLE="Discriminating Unions"
BLOG_AUTH__SECURITY_PROTOCOL="SASL_SSL"
BLOG_AUTH__SASL_MECHANISM="PLAIN"
```

### Output SASL_SSL, GSSAPI
```json
{
    "title": "Discriminating Unions",
    "auth": {
        "security_protocol": "SASL_SSL",
        "sasl_mechanism": "GSSAPI",
        "whatami": "I am GSSAPIAuthentication"
    }
}
```

That's it for now!
