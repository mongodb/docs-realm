// Open the bundled realm from the assets folder
val bundledConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .directory("src/main/assets")
    .name("bundled.realm")
    .build()
val bundledRealm = Realm.open(bundledConfig)

// Read and write to the bundled realm as normal
bundledRealm.writeBlocking {
    copyToRealm(Item().apply {
        summary = "Add another Item to the realm"
        isComplete = true
    })
}
assertEquals(2, bundledRealm.query<Item>().find().size)
