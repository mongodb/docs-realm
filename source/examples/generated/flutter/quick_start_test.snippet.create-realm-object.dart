final car = Car(3, 'Tesla', model: 'Model S', miles: 42);
realm.write(() {
  realm.add(car);
});
