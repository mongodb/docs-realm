// Per the Device Sync permissions, users can only read and write data
// where the `Car.ownerId` property matches their own user ID.
final userId = user.id;

realm.write(() {
  // WRITE SUCCEEDS
  // `newCar` is successfully written to the realm and synced to Atlas
  // because it's data matches the subscription query (miles < 100)
  // and it's `ownerId` field matches the user ID.
  final newCar = Car(ObjectId(), userId, 'Toyota', miles: 2);
  realm.add(newCar);

  // WRITE REVERTED BY COMPENSATING WRITE ERROR
  // `oldCar` is initially written to the realm, then removed upon synchronization
  // in a compensating write when the server processes the write.
  // This is because the `miles` property of `oldCar` doesn't match
  // the subscription query, which is only for cars with less than 100 miles.
  final oldCar = Car(ObjectId(), userId, 'Honda', miles: 90000);
  realm.add(oldCar);

  // WRITE REVERTED BY PERMISSION ERROR
  // `otherUsersCar` is initially written to the realm, then removed upon synchronization
  // because it's `ownerId` property doesn't match the user ID of the user
  // making the request.
  final otherUsersCar = Car(ObjectId(), 'someOtherId', 'Ford');
  realm.add(otherUsersCar);
});
