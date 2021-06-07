val config = RealmConfiguration.Builder()
    .allowQueriesOnUiThread(true)
    .allowWritesOnUiThread(true)
    .build()

val realm: Realm
try {
    realm = Realm.getInstance(config)
    Log.v("EXAMPLE", "Successfully opened a realm at: ${realm.path}")
} catch(ex: RealmFileException) {
    Log.v("EXAMPLE", "Error opening the realm at ${realm.path}")
    Log.v("EXAMPLE", ex.toString())
}
