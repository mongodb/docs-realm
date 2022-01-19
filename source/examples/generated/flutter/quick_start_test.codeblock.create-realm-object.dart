Car car;
realm.write(() {
  car = realm.create(Car()
    ..make = 'Tesla'
    ..model = 'Model Y'
    ..kilometers = 42);
});
