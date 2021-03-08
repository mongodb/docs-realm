try! realm.write {
    // Delete the instance from the realm.
    realm.delete(dog)
}
