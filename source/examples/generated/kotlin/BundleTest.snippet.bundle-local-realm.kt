// Open an existing local realm
val originalConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("original.realm")
    .build()
val originalRealm = Realm.open(originalConfig)

originalRealm.writeBlocking {
    // Add seed data to the original realm
    copyToRealm(Item().apply {
        summary = "Do the dishes"
        isComplete = false
    })
}

// Create a RealmConfiguration for the bundled copy
val copyConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("bundled.realm")
    .build()

// Delete existing file before copying
Realm.deleteRealm(copyConfig)

// Copy the realm data
originalRealm.writeCopyTo(copyConfig)

// Get the path to the copy you just created
Log.v("Bundled realm location: ${copyConfig.path}")
