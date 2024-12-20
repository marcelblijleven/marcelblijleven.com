---
title: Page Component Model
date: '2024-02-06'
tags: ['test automation', 'page component model', 'python', 'playwright', 'testing']
draft: false
summary: Page Component Model, easy scoping and maintainability in automated tests.
---

You can consider _Page Component_ Model as an extension or successor to _Page Object Model_,
a design pattern used in test automation frameworks. Using the _Page Object Model_ design pattern you create a class
for each page which hides locators and logic from your tests, while also providing ways to interact with 'pages'.

Whenever I wrote automated end-to-end tests using _Page Object Model_ I noticed two things:

1. It's great for re-usability between tests, not so much for sharing functionality between similar pages.
2. Page objects can get too big and become unmaintainable pretty fast.

The reason why it's not so great for sharing functionality between similar pages is because it requires you to create
a parent class which has a bunch of functionality that two or more pages share. As soon as one of the pages is
changed slightly you'll have a lot of refactoring to do to make sure the changes don't affect all the other pages.

The second thing is that as the project grows, pages get more functionality and so does the Page Object.
Combine this with the other reason and you get a recipe for disaster 😄.

## Page Component Model

This is why I like to keep page objects as small as possible and focus on using components instead. A component can be
as small as a `<button>` or as big as a `<form>` or any other element with lots of children and grandchildren. The key is to use _Composition over Inheritance_. This makes your
design more flexible.

You can think of Inheritance as an *is-a* relationship, which is tightly coupled and Composition
as a *has-a* relationship, which is loosely coupled. By splitting up functionality into several components it becomes
really easy to share functionality between different pages and tests.

### Common Base Component

I like to create a single base component class that every component inherits from. Usually this is as far as I go
with inheritance for the components. This base class has two purposes:

1. provide scoping
2. exposing default 'locator/element' methods.

In the following sections I'll provide some code example using Python and Playwright, but the concept applies to other
languages and frameworks too.

#### Scoping

The base component takes a locator in its init method which can be a user-visible locator like text
or css, xpath, React, Vue etc. This locator is assigned to the component so that it can be reused throughout its lifetime.

```python
class BaseComponent:
    root_locator: Locator

    def __init__(self, locator: Locator) -> None:
        self.root_locator = locator
```

This might not seem like much at the moment, but if you take into account that you can use composition on components, you
can extend this locator to new components which automatically provides scoping to the parent component.

A simple example: If you have a page with a login form, sign up form and multiple buttons spread throughout the page it can be difficult to target
the actual 'login' button instead of one of the many other buttons. By using the root locator of a component this becomes
a lot easier because you can use it to locate other elements/components that are children or grandchildren in the DOM.

```python
class LoginForm(BaseComponent):
    @property
    def login_button(self) -> Locator:
        self.root_locator.locator("button")  # This is scoped to `#login-form button`


login_form = LoginForm(page.locator(#login-form))
login_form.login_button.click()
```

This can be extended to other components too:

```python
class SuperSubmitButton(BaseComponent):
    ...  # details omitted


class LoginForm(BaseComponent):
    submit_button: SuperSubmitButton

    def __init__(self, locator: Locator) -> None:
        super().__init__(locator)
        self.submit_button = SuperSubmitButton(this.root_locator.locator("button"))
```

Because you're using the root_locator of the LoginForm component, the SuperSubmitButton will automatically be
scoped to `#login-form button`.

#### Exposing default locator/element methods

Other things I like to add to the base component are the default locator methods you get on a locator, these can be:

* click
* type
* is visible
* scroll into view
* and more

To add these methods to the base component you simple have to call them on the root locator:

```python
class BaseComponent:
    ...

    def click(self, **kwargs) -> None:
        return self.root_locator.click(**kwargs)

    def type(
        self,
        text: str,
        *,
        delay: float | None = None,
        timeout: float | None = None,
        no_wait_after: bool | None = None,
    ) -> None:
        return self.root_locator.type(
            text,
            delay=delay,
            timeout=timeout,
            no_wait_after=no_wait_after
        )
```

This allows you to interact with your custom components just like you would with normal locators.

## Adding component specific methods

Now that you have a basic component you can create components with specific methods you want to use in tests. For example
a login form. If you think about the ways you interact with a login form there are three main actions you do when logging
in:

1. Type in username
2. Type in password
3. Press the login button

So we can identify at least three fields, or subcomponents, we interact with. Two input fields and a button. Let's first
add these.

```python
class LoginForm(BaseComponent):
    ...

    @property
    def username_inputfield(self) -> Locator:
        self.root_locator.locate("input[name='username']")

    @property
    def password_inputfield(self) -> Locator:
        self.root_locator.locate("input[name='password']")

    @property
    def login_button(self) -> Locator:
        self.root_locator.locate("button[type='submit']")
```

Now it's possible to enter a username using just `login_form.username_inputfield.type("...")`. You could put this
inside a separate method too.

```python
class LoginForm(BaseComponent):
    def enter_username(self, username: str) -> None:
        self.username_inputfield.type(username)
```

Then combine all the methods into a single login method

```python
class LoginForm(BaseComponent):
    def login(self, username: str, password: str) -> None:
        self.enter_username(username)
        self.enter_password(password)
        self.login_button.click()
```

And now you have a working LoginForm component that you can use on both the login page and for example an order checkout
page.

## Using components

Now it's time to use the components in your tests. You can still use page objects, a login page *has a* login form for example. But you don't need to, you can
use a lightweight method too.

```python
# Page Object
def test_user_can_login(page: Page, user_credentials: tuple[str, str]) -> None:
    login_page = LoginPage(page)
    login_page.goto()

    login_page.login_form.login(*user_credentials)

    assert ...

# No Page Object
def test_user_can_login(page: Page, user_credentials: tuple[str, str]) -> None:
    page.goto("https://www.marcelblijleven.com")
    login_form = LoginForm(page.locator("#login-form"))

    login_form.login(*user_credentials)

    assert ...
```

That's it for the basics on Page Componente. Have fun tinkering with them!
