final fordFusion = realm.write<Car>(() {
  return realm.add(Car(ObjectId(), 'Ford', model: 'Fusion', miles: 101));
});
