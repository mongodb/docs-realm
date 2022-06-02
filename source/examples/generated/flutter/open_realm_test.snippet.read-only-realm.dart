var config = Configuration.local([Car.schema], isReadOnly: true);
realm = Realm(config);
