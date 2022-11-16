final car1 = Car(ObjectId(), 'Honda', model: 'Accord', miles: 42);
final car2 = Car(ObjectId(), 'Audi', model: 'A4', miles: 42);
realm.write(() {
  realm.addAll<Car>([car1, car2]);
});
