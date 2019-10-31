// Open a thread-safe transaction.
realm.executeTransaction(r -> {
    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.setName("Wolfie");
    dog.setAge(dog.getAge() + 1);
});
