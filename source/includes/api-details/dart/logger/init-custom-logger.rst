This sets the logger for databse logging in this isolate.
If you do not provide a logger, the isolate gets a logger instance by 
default. You can attach to listen to the default logger using 
``Realm.logger.onRecord.listen``:

Only the first isolate that is using the database prints the log messages. Any
new spawned isolates that work with the database get a new ``Realm.logger``
instance, but do not ``print`` by default.

The default log level is :flutter-sdk:`RealmLogLevel.info 
<realm/RealmLogLevel/info-constant.html>`. You can change the log level 
per-isolate.
