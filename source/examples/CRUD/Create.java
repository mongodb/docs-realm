// Open a thread-safe transaction.
realm.executeTransaction(r -> {
    // Instantiate the class using the factory function.
    Dog dog = realm.createObject(Dog.class);

    // Configure the instance.
    dog.setName("Max");
    dog.setAge(5);
});
