Before you can authenticate users with Facebook, you must set up 
the authentication flow for your application by following the 
official :facebook:`Facebook Login for Android Quickstart
<docs/facebook-login/android>`. 

In the login completion handler, get the logged in user's access
token from the Facebook 
:facebook:`LoginResult <docs/reference/android/current/class/LoginResult>`. 
Use the access token to create a Facebook credential by calling  
:kotlin-sync-sdk:`Credentials.facebook()
<io.realm.kotlin.mongodb/-credentials/-companion/facebook.html>`
with the user's access token, and then pass the generated credential
to :kotlin-sync-sdk:`app.login()
<io.realm.kotlin.mongodb/-app/login.html>`.

.. include:: /includes/note-facebook-profile-picture-url.rst

Kotlin Multiplatform (KMP) supports many environments, but this example shows
sign-in on the Android platform. For information about signing into a Facebook
account on Apple platforms, switch the language selector on this page to
:guilabel:`Swift`.
