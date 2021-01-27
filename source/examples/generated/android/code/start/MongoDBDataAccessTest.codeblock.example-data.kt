val user = app.currentUser()
val mongoClient =
    user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
val mongoDatabase =
    mongoClient.getDatabase("plant-data-database")
val mongoCollection =
    mongoDatabase.getCollection("plant-data-collection")
mongoCollection.insertMany(
    Arrays.asList(
        Plant(
            ObjectId(),
            "venus flytrap",
            "full",
            "white",
            "perennial",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "sweet basil",
            "partial",
            "green",
            "annual",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "thai basil",
            "partial",
            "green",
            "perennial",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "helianthus",
            "full",
            "yellow",
            "annual",
            "Store 42"
        ),
        Plant(
            ObjectId(),
            "petunia",
            "full",
            "purple",
            "annual",
            "Store 47"
        )
    )
)
Log.v("EXAMPLE", "Successfully Successfully inserted the sample data.")