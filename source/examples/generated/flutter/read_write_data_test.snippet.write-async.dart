// Add Subaru Outback to the realm using `writeAsync`
Car newOutback = Car("Subaru", model: "Outback Touring XT", miles: 2);
await realm.writeAsync(() {
  realm.add<Car>(newOutback);
});
