To log in with anonymous
authentication, create an anonymous credential by calling
:flutter-sdk:`Credentials.anonymous() <realm/Credentials/Credentials.anonymous.html>`
and then pass the generated credential to
``app.logIn``.

.. literalinclude:: /examples/generated/flutter/authenticate_users_test.snippet.anonymous-credentials.dart
   :language: dart

If you want more than one anonymous user, set ``reuseCredentials: false``
when creating additional anonymous credentials.
