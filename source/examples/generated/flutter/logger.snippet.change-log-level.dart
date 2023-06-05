// Set a default log level that's not too verbose
Realm.logger.level = RealmLogLevel.info;
executeAppCode();
// Later, change the log level to debug an issue when running specific code
Realm.logger.level = RealmLogLevel.trace;
executeComplexCodeToDebug();
