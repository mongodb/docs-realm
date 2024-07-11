.. versionadded:: 10.8.0

You can observe a flow of authentication change events by calling 
:kotlin-sync-sdk:`App.authenticationChangeAsFlow()
<io.realm.kotlin.mongodb/-app/authentication-change-as-flow.html>`.
This flow emits :kotlin-sync-sdk:`AuthenticationChange
<io.realm.kotlin.mongodb/-authentication-change/index.html>` 
events of three possible states, represented as subclasses:

- ``LoggedIn``: A user logs into the app.
- ``LoggedOut``: A a user logs out of the app.
- ``Removed``: A user is removed from the app, which also logs them out.

These events contain a ``user`` property that provides a reference to the 
``User`` object that has logged in, logged out, or been removed.
