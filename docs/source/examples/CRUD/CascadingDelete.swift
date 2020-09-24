try! realm.write {
    // Delete Ali's dogs.
    realm.delete(ali.dogs);
    // Delete Ali.
    realm.delete(ali);
}
