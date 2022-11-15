final id = ObjectId();
// Add Toyota Prius to the realm with primary key `id`
Car newPrius = Car(id, "Toyota", model: "Prius", miles: 0);
realm.write(() {
  realm.add<Car>(newPrius);
});

// Update Toyota Prius's miles in the realm with primary key `id`
Car usedPrius = Car(id, "Toyota", model: "Prius", miles: 500);
realm.write(() {
  realm.add<Car>(usedPrius, update: true);
});
