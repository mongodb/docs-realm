User user = app.currentUser();
MongoClient mongoClient =
        user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
MongoDatabase mongoDatabase =
        mongoClient.getDatabase("plant-data-database");
MongoCollection<Document> mongoCollection =
        mongoDatabase.getCollection("plant-data-collection");
mongoCollection.deleteMany(new Document());
mongoCollection.insertMany(Arrays.asList(
        new Plant(new ObjectId(),
                "venus flytrap",
                "full",
                "white",
                "perennial",
                "Store 42"),
        new Plant(new ObjectId(),
                "sweet basil",
                "partial",
                "green",
                "annual",
                "Store 42"),
        new Plant(new ObjectId(),
                "thai basil",
                "partial",
                "green",
                "perennial",
                "Store 42"),
        new Plant(new ObjectId(),
                "helianthus",
                "full",
                "yellow",
                "annual",
                "Store 42"),
        new Plant(new ObjectId(),
                "petunia",
                "full",
                "purple",
                "annual",
                "Store 47")));
Log.v("EXAMPLE", "Successfully inserted the sample data.");
