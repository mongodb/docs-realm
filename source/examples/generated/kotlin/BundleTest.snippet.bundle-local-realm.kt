// open an existing realm
val originalConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("original-realm")
    .build()
val originalRealm = Realm.open(originalConfig)

originalRealm.writeBlocking {

    // add some seed data to the original realm
    copyToRealm(Item().apply {
        summary = "Do the dishes"
        isComplete = false
    })
}

// Create a RealmConfiguration for the copy
val copyConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("copy-realm")
    .build()

// Make sure the file doesn't already exist
Realm.deleteRealm(copyConfig)

// Copy the realm
originalRealm.writeCopyTo(copyConfig)

val copyRealm = Realm.open(copyConfig)
val copiedItems: RealmResults<Item> = copyRealm.query<Item>().find()
for(item in copiedItems) {
    Log.v("My copied Item: ${item.summary}") // you should see the seed data you created earlier
}


