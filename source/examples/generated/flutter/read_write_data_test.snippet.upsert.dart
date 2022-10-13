// Add Toyota Prius to the realm with primary key `Toyota`
Car newPrius = Car("Toyota", model: "Prius", miles: 0);
realm.write(() {
  realm.add<Car>(newPrius);
});

// Update Toyota Prius's miles in the realm with primary key `Toyota`
Car usedPrius = Car("Toyota", model: "Prius", miles: 500);
realm.write(() {
  realm.add<Car>(usedPrius, update: true);
});
