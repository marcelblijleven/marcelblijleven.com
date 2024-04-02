---
title: Validate return values with Pydantic
date: '2023-12-20'
tags: ['python', 'pydantic', 'code']
draft: false
summary: A decorator for validating function return values with Pydantic
---

## Decorator

Here's a little helper decorator that will validate return values from functions, for
example functions that return json from an HTTP request.

The decorator will only call `inspect.signature` once when it loads the module and checks if the return
annotation is a Pydantic BaseModel. If not, it will simply return the base function.

```python
import functools
import inspect

from typing import Callable, Any, TypeVar

from pydantic import BaseModel, ValidationError

ValidatedCallable = TypeVar("ValidatedCallable", bound=Callable[..., Any])


def validate(func: ValidatedCallable) -> ValidatedCallable:
    """
    If the return annotation is a Pydantic BaseModel, use the
    annotation to call model_validate on the outcome of the wrapped
    function
    """
    sig = inspect.signature(func)
    return_annotation = sig.return_annotation

    if not issubclass(return_annotation, BaseModel):
        return func

    @functools.wraps(func)
    def validated():
        ret: dict = func()

        try:
            return return_annotation.model_validate(ret)
        except ValidationError:
            return ret

    return validated
```

If needed, you can ignore the try...catch and let the errors bubble up to be handled somewhere in your code.

## Example

Take a look at the following function which calls an HTTP endpoint and returns the `response.json()` value.

```python
@validate
def get_bami() -> Bami:
    with httpx.Client() as client:
        response = client.get("https://foo.bar")
        response.raise_for_status()
    return response.json()

```

Since it is decorated by the `validate` decorator, the return value will be converted to an instance of `Bami`. This can
be confirmed by a simple test.

```python
def test_get_bami(respx_mock):
    respx_mock.get("https://foo.bar/").mock(
        return_value=httpx.Response(
            status_code=200,
            json={"deliciousness": 9001}
        )
    )
    response = get_bami()
    assert isinstance(response, Bami)

```

