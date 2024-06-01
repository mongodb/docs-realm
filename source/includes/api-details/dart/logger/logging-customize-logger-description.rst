The Flutter SDK can use a custom logger that conforms to the `Dart
Logger class <https://pub.dev/documentation/logging/latest/logging/Logger-class.html>`__.

To set a custom logger, create a ``Logger`` and set it using the
:flutter-sdk:`Realm.logger <realm/RealmLogger-class.html>` static
property from the first isolate:
