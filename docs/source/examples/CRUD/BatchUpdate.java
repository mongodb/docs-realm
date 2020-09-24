realm.executeTransaction(r -> {
    // Create a person named Ali.
    Person ali = realm.createObject(Person.class, 2);
    ali.name = "Ali";

    // Find dogs younger than 2.
    RealmResults<Dog> puppies = realm.where(Dog.class).lessThan("age", 2).findAll();

    // Give all puppies to Ali.
    puppies.setObject("owner", ali);
});
