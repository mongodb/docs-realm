To log in with Apple authentication, create an
Apple credential by calling :kotlin-sync-sdk:`Credentials.apple()
<io.realm.kotlin.mongodb/-credentials/-companion/apple.html>`
with the user's token, and then pass the generated credential
to :kotlin-sync-sdk:`app.login()
<io.realm.kotlin.mongodb/-app/login.html>`:

Kotlin Multiplatform (KMP) supports many environments, but this example shows
sign-in on the Android platform. For information about signing in with Apple
on Apple platforms, switch the language selector on this page to
:guilabel:`Swift`.
