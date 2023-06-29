// Per the Device Sync permissions, users can only read and write data
// where the `Car.ownerId` property matches their own user ID.
val userId = user.id
val newCar = Car().apply {
    ownerId = userId
    make = "Toyota"
    model = "Corolla"
    miles = 2
}

syncRealm.write {
    // `newCar` is successfully written to the realm and synced to Atlas
    // because its data matches the subscription query (miles < 100)
    // and its `ownerId` field matches the user ID.
    this.copyToRealm(newCar)
}
