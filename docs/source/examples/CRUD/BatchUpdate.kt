// Open a thread-safe transaction.
realm.executeTransaction { r ->
    // Create a person named Ali.
    val ali = realm.createObject<Person>(2)
    ali.name = "Ali"

    // Find dogs younger than 2.
    val puppies = realm.where<Dog>().lessThan("age", 2).findAll()

    // Give all puppies to Ali.
    puppies.setObject("owner", ali)
}
