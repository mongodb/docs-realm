// return a random key from the given seed
fun getRandomKey(seed: Long? = null): ByteArray {
    // generate a new 64-byte encryption key
    val key = ByteArray(64)
    if (seed != null) {
        // If there is a seed provided, create a random number with that seed and fill the byte array with random bytes
        Random(seed).nextBytes(key)
    } else {
        // fill the byte array with random bytes
        Random.nextBytes(key)
    }
    return key
}

runBlocking {
    // Create the configuration
    val config = RealmConfiguration.Builder(
        setOf(Frog::class))
        // specify the encryptionKey
        .encryptionKey(getRandomKey())
        .build()
    // Open a realm with the encryption key.
    val realm = Realm.open(config)
    Log.v("Successfully opened realm:" +
            realm.configuration.name
    )

}
