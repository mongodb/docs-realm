// Create a RealmConfiguration for the bundled copy.
// The file name for this bundled copy is different than the initial realm file.
// The initialRealmFile value is the `name` property of the asset realm you're bundling.
val copyConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("bundled.realm")
    .initialRealmFile("original.realm")
    .build()
