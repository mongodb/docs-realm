realm.executeTransaction { r ->
    // Delete all object from the realm.
    realm.deleteAll()
}
