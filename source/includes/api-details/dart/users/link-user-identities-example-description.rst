You can link identities by passing the :flutter-sdk:`Credentials <realm/Credentials-class.html>`
that you want to link to :flutter-sdk:`User.linkCredentials() <realm/User/linkCredentials.html>`.

.. literalinclude:: /examples/generated/flutter/authenticate_users_test.snippet.link-user-credentials.dart
   :language: dart

In the example below, we register an anonymous user, then later register an
email/password user and link the credentials.
