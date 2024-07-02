Follow the official :facebook:`Facebook Login for Android Quickstart
<docs/facebook-login/android>` to set up the authentication flow for your
application. In the login completion handler, get the logged in user's access
token from the Facebook :facebook:`LoginResult
<docs/reference/android/current/class/LoginResult>`. Use the access token to
create a Facebook credential for Atlas Device SDK, and then log the user into
your app.
