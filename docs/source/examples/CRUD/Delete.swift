try! realm.write {
    // Delete the instance from the realm.
    realm.delete(dog);

    // Discard the reference.
    dog = nil;
}
