Refresh an access token with :flutter-sdk:`User.refreshCustomData() <realm/User/refreshCustomData.html>`.

.. literalinclude:: /examples/generated/flutter/access_token_test.snippet.refresh-access-token.dart
   :language: dart

You can also periodically refresh the access token 
with `Timer.periodic() <https://api.flutter.dev/flutter/dart-async/Timer-class.html>`__
from the ``dart:async`` library. Wrap the call to ``User.refreshCustomData()``
with the timer's callback function.
