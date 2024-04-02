---
title: Truediv
date: '2023-12-19'
tags: ['python', 'code']
draft: false
summary: Easy url building with truediv
---

I'm a big fan of the way the `/` operator can be used to 'build' `Path` objects. For example, `Path("foo") / "bar"` becomes
`foo/bar`. So what makes this possible?

Turns out it's the `__truediv__` method. This method allows you to modify the behaviour of a class when
the `/` operator is used. This opens up all sorts of cool things, for example building an url using the builtin `urljoin` function.

In the following example I use Pydantic's RootModel to create a `FancyUrl` model that calls the `urljoin` function inside
the `__truediv__` method and returns the output. I then use this in a 'Settings' object to demonstrate a use-case.

```python
from urllib.parse import urljoin
from pydantic import RootModel
from pydantic_settings import BaseSettings


class FancyUrl(RootModel):
    root: str

    def __truediv__(self, other: str) -> str:
        return urljoin(self.root, other)

    def __str__(self) -> str:
        return self.root


class Settings(BaseSettings):
    blog: FancyUrl


settings = Settings(blog="https://marcelblijleven.com")

# This prints https://marcelblijleven.com
print(settings.blog)
# This prints https://marcelblijleven.com/blog/truediv
print(settings.blog / "blog/truediv")

```

This is already quite nice, but what if you want to add more segments? If you run `settings.blog / "blog" / "foo"` you'll be
presented with an error:

```shell
TypeError: unsupported operand type(s) for /: 'str' and 'str'
```

This is because we return a `str` and not a `FancyUrl`. So let's improve the `__truediv__` method a bit.

```python
...
from typing import Self  # This import is added
...

class FancyUrl(RootModel):
    root: str

    def __truediv__(self, other: str) -> Self:
        # We now set self.root here
        self.root = urljoin(self.root, other)
        # And return self
        return self

    def __str__(self) -> str:
        return self.root

...
```

This solves the issue and lets you chain the `/` operator on your new FancyUrl!
