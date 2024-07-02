To log in with anonymous authentication, create an anonymous credential 
by calling :kotlin-sync-sdk:`Credentials.anonymous()
<io.realm.kotlin.mongodb/-credentials/-companion/anonymous.html>`, 
and then pass the generated credential to
:kotlin-sync-sdk:`app.login()
<io.realm.kotlin.mongodb/-app/login.html>`:

.. literalinclude:: /examples/generated/kotlin/AuthenticationTest.snippet.anonymous-authentication.kt
   :language: kotlin

By default, the Kotlin SDK reuses the same anonymous user 
if that user has not logged out. If you want to create more than
one anonymous user, set ``reuseExisting = false`` when logging in 
with additional anonymous credentials:
