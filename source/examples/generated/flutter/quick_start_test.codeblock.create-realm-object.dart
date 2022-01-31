final car = Car('Tesla', 'Model S', miles: 42);
realm.write(() {
  realm.add(car);
});
