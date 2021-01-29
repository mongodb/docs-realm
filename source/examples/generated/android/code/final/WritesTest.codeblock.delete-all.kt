realm.executeTransaction { r : Realm ->
    r.deleteAll()
    expectation.fulfill()
}