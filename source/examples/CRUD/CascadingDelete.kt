realm.executeTransaction { realm ->
    // Delete all of Ali's dogs.
    ali.dogs.deleteAllFromRealm()
    // Delete Ali.
    ali.deleteFromRealm()
}
