val bundledConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .directory("src/main/assets")
    .name("copy-path")
    .build()
val bundledRealm = Realm.open(bundledConfig)

val bundledItems: RealmResults<Item> = bundledRealm.query<Item>().find()
for(item in bundledItems) {
    Log.v("My copied Item: ${item.summary}") // you should see the seed data you bundled earlier
}
