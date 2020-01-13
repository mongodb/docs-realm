// Open a thread-safe transaction.
realm.executeTransaction { realm ->
    // Instantiate the class using the factory function.
    val dog = realm.createObject<Dog>()

    // Configure the instance.
    dog.name = "Max"
    dog.age = 5

    // Create a Person with a primary key.
    val primaryKeyValue = 123
    val person = realm.createObject<Person>(primaryKeyValue)
}
