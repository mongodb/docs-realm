final app = App(AppConfiguration(APP_ID));
final user = await app.logIn(Credentials.anonymous());
print("Bundling synced realm");
final config =
    Configuration.flexibleSync(user, [Car.schema], path: 'bundle.realm');
final realm = Realm(config);

// Add data to realm
realm.write(() {
  realm.add(Car(ObjectId(), "Audi", model: 'A8'));
  realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
});

// Sync changes with the server
await realm.syncSession.waitForUpload();
await realm.syncSession.waitForDownload();

print("Bundled realm location: " + realm.config.path);
realm.close();
