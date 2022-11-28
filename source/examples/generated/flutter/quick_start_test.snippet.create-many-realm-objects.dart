final car1 = Car(ObjectId(), 'Honda', model: 'Accord', miles: 16);
final car2 = Car(ObjectId(), 'Audi', model: 'A4', miles: 22);
realm.write(() {
  realm.addAll<Car>([car1, car2]);
});
