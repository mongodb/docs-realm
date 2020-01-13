// Open a thread-safe transaction.
realm.executeTransaction { r ->
    // Get a dog to update.
    val dog = realm.where<Dog>().findFirst()

    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.name = "Wolfie"
    dog.age = dog.age + 1
}
