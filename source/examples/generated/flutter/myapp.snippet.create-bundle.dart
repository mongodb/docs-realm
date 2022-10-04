print("Bundling realm");
LocalConfiguration config =
    Configuration.local([Car.schema], path: 'bundle.realm');
Realm realm = Realm(config);

realm.write(() {
  realm.add(Car("Audi", model: 'A8'));
  realm.add(Car("Mercedes", model: 'G Wagon'));
});
print("Bundled realm location: " + realm.config.path);
realm.close();
