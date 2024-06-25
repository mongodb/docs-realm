To log in with a Google authentication code, pass a Google authentication code to
:flutter-sdk:`Credentials.googleAuthCode() <realm/Credentials/Credentials.googleAuthCode.html>`.
Then pass the credential to ``app.logIn``.

.. literalinclude:: /examples/generated/flutter/authenticate_users_test.snippet.google-auth-code-credentials.dart
   :language: dart

To log in with a Google ID token, pass a Google ID token to
:flutter-sdk:`Credentials.googleIdToken() <realm/Credentials/Credentials.googleIdToken.html>`.
Then pass the credential to ``app.logIn``.
