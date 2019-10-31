realm.executeTransaction(r -> {
    // Find dogs younger than 2 years old.
    RealmCollection<Dog> puppies = realm.where(Dog.class).lessThan("age", 2).findAll();

    // Delete all instances in the collection from the realm.
    puppies.deleteAllFromRealm();
});
