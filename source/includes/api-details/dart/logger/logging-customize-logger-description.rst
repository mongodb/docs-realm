The Flutter SDK logger conforms to the `Dart Logger class 
<https://pub.dev/documentation/logging/latest/logging/Logger-class.html>`__.

To get started, set a log level:

.. literalinclude:: /examples/generated/flutter/logger.snippet.set-the-log-level.dart
  :language: dart

Define custom logging behavior by listening to :flutter-sdk:`Realm.logger.onRecord 
<realm/RealmLogger/onRecord.html>`:
