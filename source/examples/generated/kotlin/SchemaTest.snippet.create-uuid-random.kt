realm.write {
    this.copyToRealm(Cat().apply {
        _id = RealmUUID.random()
    })
}
