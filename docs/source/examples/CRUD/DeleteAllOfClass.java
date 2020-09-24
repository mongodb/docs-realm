realm.executeTransaction(r -> {
    // Delete all instances of Dog from the realm.
    realm.delete(Dog.class);
});
