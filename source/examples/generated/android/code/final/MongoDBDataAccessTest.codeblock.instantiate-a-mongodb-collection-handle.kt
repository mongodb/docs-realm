val user = app.currentUser()
val mongoClient =
    user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
val mongoDatabase =
    mongoClient.getDatabase("custom-user-data-database")
val mongoCollection =
    mongoDatabase.getCollection("custom-user-data-collection")
Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
expectation.fulfill()