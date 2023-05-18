// After moving the bundled realm to the appropriate location for your app's platform,
// open and use the bundled realm as usual.
val bundledRealm = Realm.open(copyConfig)
val bundledItems: RealmResults<Item> = bundledRealm.query<Item>().find()
for(item in bundledItems) {
    Log.v("Item in the bundledRealm: ${item.summary}")
}
bundledRealm.close()
