void dataCb(Realm realm) {
  realm.add(Car(3, 'Honda'));
}

Configuration config =
    Configuration.local([Car.schema], initialDataCallback: dataCb);
Realm realm = Realm(config);
Car honda = realm.all<Car>()[0];
