Realm realm = Realm.getDefaultInstance();

// Open a thread-safe transaction.
realm.executeTransaction(r -> {
    // Instantiate the class using the factory function.
    dog = realm.createObject(Dog.class);

    // Configure the instance.
    dog.setName("Max");
    dog.setAge(5);
});

// ...

// Always remember to close the realm when 
// you are done with it.
realm.close();
