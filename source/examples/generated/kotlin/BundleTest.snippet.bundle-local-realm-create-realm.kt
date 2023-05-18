// Open a local realm to use as the asset realm
val originalConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("original.realm")
    .build()
val originalRealm = Realm.open(originalConfig)

originalRealm.writeBlocking {
    // Add seed data to the original realm
    copyToRealm(Item().apply {
        summary = "Write an awesome app"
        isComplete = false
    })
}

// Verify the data in the existing realm
// (this data should also be in the bundled realm we open later)
val originalItems: RealmResults<Item> = originalRealm.query<Item>().find()
for(item in originalItems) {
    Log.v("Item in the originalRealm: ${item.summary}")
}
