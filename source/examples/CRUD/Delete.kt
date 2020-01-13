// Get a dog to delete.
val dog = realm.where<Dog>().findFirst()

realm.executeTransaction { realm ->
    // Delete the instance from its realm.
    dog.deleteFromRealm()

    // Discard the reference.
    dog = null
}
