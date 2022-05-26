Car fordFusion = realm.write<Car>(() {
  return realm.add(Car('Ford', model: 'Fusion', miles: 101));
});
