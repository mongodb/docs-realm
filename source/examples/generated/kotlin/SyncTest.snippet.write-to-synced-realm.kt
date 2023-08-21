// Write List and Item objects to the synced realm
// Objects that match the subscription query are synced to Atlas
realm.write {
    val list = List().apply {
        name = "My Todo List"
        ownerId = myAuthenticatedUser.id
        items.add(Item().apply {
            name = "Check email"
        })
    }
    copyToRealm(list)
}
realm.syncSession.uploadAllLocalChanges(30.seconds)
