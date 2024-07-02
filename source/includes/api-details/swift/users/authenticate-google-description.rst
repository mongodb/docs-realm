Follow the official :google:`Google Sign-In for iOS Integration Guide
<identity/sign-in/ios/start-integrating>` to set up the authentication flow for
your application. In the sign-in completion handler, create an App Services
Google credential and log the user into your App Services app.

The value that you pass to the credential depends on whether or not you have
:ref:`enabled OpenID Connect <openIdConnect>` for the provider:

- If OpenID Connect is enabled, pass the ``id_token``
  :google:`included in the Google OAuth response
  <identity/sign-in/ios/backend-auth>` to :swift-sdk:`Credentials.googleId(token:)
  <Enums/Credentials.html#/s:10RealmSwift11CredentialsO8googleIdyACSS_tcACmF>`.

- If OpenID Connect is not enabled, pass the user's :google:`server auth code
  <identity/sign-in/ios/reference/Classes/GIDGoogleUser#serverauthcode>` to
  :swift-sdk:`Credentials.google(serverAuthCode:)
  <Enums/Credentials.html#/s:10RealmSwift11CredentialsO6googleyACSS_tcACmF>`.
