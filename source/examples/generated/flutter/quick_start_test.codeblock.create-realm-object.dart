final car = Car('Tesla', 'Model S', miles: 42);
realm.write(() {
  addedCar = realm.add(car); // :ignore:
  // realm.add(car);
});
