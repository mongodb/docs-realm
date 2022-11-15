Car fordFusion = realm.write<Car>(() {
  return realm.add(Car(1, 'Ford', model: 'Fusion', miles: 101));
});
