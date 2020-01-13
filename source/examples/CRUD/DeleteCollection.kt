realm.executeTransaction { r ->
    // Find dogs younger than 2 years old.
    val puppies = realm.where<Dog>().lessThan("age", 2).findAll()

    // Delete all instances in the collection from the realm.
    puppies.deleteAllFromRealm()
}
