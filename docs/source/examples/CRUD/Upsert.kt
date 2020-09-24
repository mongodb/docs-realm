realm.executeTransaction { r ->
    val drew = Person()
    drew.id = 1234
    drew.name = "Drew"
    // Add a new person to the realm. Since nobody with ID 1234
    // has been added yet, this adds the instance to the realm.
    realm.insertOrUpdate(drew)

    val andy = Person()
    andy.id = 1234
    andy.name = "Andy"
    // Judging by the ID, it's the same person, just with a different name.
    // When `update` is true, you overwrite the original entry (i.e. Drew -> Andy).
    realm.insertOrUpdate(andy)
}
