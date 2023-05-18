// Open a local realm to use as the asset realm
val originalConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("original.realm")
    .build()
val originalRealm = Realm.open(originalConfig)

originalRealm.writeBlocking {
    // Add seed data to the original realm
    copyToRealm(Item().apply {
        summary = "Make sure the app has the data it needs"
        isComplete = false
    })
}

// Verify the data in the existing realm
// (this data should also be in the bundled realm we open later)
val originalItems: RealmResults<Item> = originalRealm.query<Item>().find()
for(item in originalItems) {
    Log.v("Item in the originalRealm: ${item.summary}")
}

// Create a RealmConfiguration for the bundled copy.
// The file name for this bundled copy is different than the initial realm file.
// The initialRealmFile value is the `name` property of the asset realm you're bundling.
val copyConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("bundled.realm")
    .initialRealmFile("original.realm")
    .build()

// Copy the realm data
originalRealm.writeCopyTo(copyConfig)

// Get the path to the copy you just created.
// You must move this file into the appropriate location for your app's platform.
Log.v("Bundled realm location: ${copyConfig.path}")

originalRealm.close()

// After moving the bundled realm to the appropriate location for your app's platform,
// open and use the bundled realm as usual.
val bundledRealm = Realm.open(copyConfig)
val bundledItems: RealmResults<Item> = bundledRealm.query<Item>().find()
for(item in bundledItems) {
    Log.v("Item in the bundledRealm: ${item.summary}")
}
bundledRealm.close()
