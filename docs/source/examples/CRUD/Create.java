// Open a thread-safe transaction.
realm.executeTransaction(r -> {
    // Instantiate the class using the factory function.
    Dog dog = realm.createObject(Dog.class);

    // Configure the instance.
    dog.setName("Max");
    dog.setAge(5);

    // Create a Person with a primary key.
    int primaryKeyValue = 123;
    Person person = realm.createObject(Person.class, primaryKeyValue);
});
