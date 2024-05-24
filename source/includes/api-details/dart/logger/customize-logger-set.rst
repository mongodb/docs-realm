The Realm Flutter SDK can use a custom logger that conforms to the `Dart
Logger class <https://pub.dev/documentation/logging/latest/logging/Logger-class.html>`__.

To set a custom logger, create a ``Logger`` and set it using the
:flutter-sdk:`Realm.logger <realm/Realm/logger.html>` static
property from the first isolate.

.. literalinclude:: /examples/generated/flutter/logger.snippet.set-custom-logger.dart
   :language: dart

This sets the logger for Realm logging in this isolate.
If you do not provide a logger, the isolate gets a logger instance by 
default. You can attach to listen to the default logger using 
``Realm.logger.onRecord.listen``.

Only the first isolate that is using Realm prints the log messages. Any new 
spawned isolates that work with Realm get a new ``Realm.logger`` instance, 
but do not ``print`` by default.

The default log level is :flutter-sdk:`RealmLogLevel.info 
<realm/RealmLogLevel/info-constant.html>`. You can change the log level 
per-isolate.
