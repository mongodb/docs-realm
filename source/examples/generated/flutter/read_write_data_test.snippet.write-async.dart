// Add Subaru Outback to the realm using `writeAsync`
Car newOutback =
    Car(ObjectId(), "Subaru", model: "Outback Touring XT", miles: 2);
realm.writeAsync(() {
  realm.add<Car>(newOutback);
});
