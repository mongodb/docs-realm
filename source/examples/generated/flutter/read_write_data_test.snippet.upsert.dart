// Add Toyota Prius to the realm with primary key `2`
Car newPrius = Car(2, "Toyota", model: "Prius", miles: 0);
realm.write(() {
  realm.add<Car>(newPrius);
});

// Update Toyota Prius's miles in the realm with primary key `2`
Car usedPrius = Car(2, "Toyota", model: "Prius", miles: 500);
realm.write(() {
  realm.add<Car>(usedPrius, update: true);
});
