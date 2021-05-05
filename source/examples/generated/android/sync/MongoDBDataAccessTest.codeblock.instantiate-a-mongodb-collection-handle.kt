val user = app.currentUser()
val mongoClient =
    user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
val mongoDatabase =
    mongoClient.getDatabase("plant-data-database")
var mongoCollection =
    mongoDatabase.getCollection("plant-data-collection",
        Plant::class.java)
// registry to handle POJOs (Plain Old Java Objects)
val pojoCodecRegistry = CodecRegistries.fromRegistries(
    mongoCollection.codecRegistry,
    CodecRegistries.fromProviders(
        PojoCodecProvider.builder().automatic(true).build()))
mongoCollection = mongoCollection.withCodecRegistry(pojoCodecRegistry)
Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
