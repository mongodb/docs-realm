// Create a SyncConfiguration for the bundled copy.
// The file name for this bundled copy is different than the initial realm file.
// The initialRealmFile value is the `name` property of the asset realm you're bundling.
val copyConfig = SyncConfiguration.Builder(user, setOf(Item::class))
    .name("prefilled.realm")
    .initialRealmFile("asset.realm")
    .build()
