// Open a thread-safe transaction.
realm.executeTransaction(r -> {
    // Get a dog to update.
    var dog = realm.where(Dog.class).findFirst();

    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.setName("Wolfie");
    dog.setAge(dog.getAge() + 1);
});
