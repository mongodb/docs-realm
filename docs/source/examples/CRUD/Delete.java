realm.executeTransaction(r -> {
    // Delete the instance from its realm.
    dog.deleteFromRealm();

    // Discard the reference.
    dog = null;
});
