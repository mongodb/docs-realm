In the Flutter SDK, you set a logger for database logging in an isolate.
If you do not provide a logger, the isolate gets a logger instance by 
default. You can to the default logger using ``Realm.logger.onRecord.listen``:

Only the first isolate that uses the database prints log messages. Any
newly-spawned isolates that work with the database get a new ``Realm.logger``
instance, but do not ``print`` by default.

The default log level is :flutter-sdk:`RealmLogLevel.info 
<realm/RealmLogLevel/info-constant.html>`. You can change the log level 
per-isolate.
