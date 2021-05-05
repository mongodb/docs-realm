User user = app.currentUser();
MongoClient mongoClient =
        user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
MongoDatabase mongoDatabase =
        mongoClient.getDatabase("plant-data-database");
MongoCollection<Plant> mongoCollection =
        mongoDatabase.getCollection("plant-data-collection", Plant.class);
// registry to handle POJOs (Plain Old Java Objects)
CodecRegistry pojoCodecRegistry = fromRegistries(mongoCollection.getCodecRegistry(),
        fromProviders(PojoCodecProvider.builder().automatic(true).build()));
mongoCollection = mongoCollection.withCodecRegistry(pojoCodecRegistry);
Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
