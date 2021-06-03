val mongoClient =
    user!!.getMongoClient("mongodb-atlas")
val mongoDatabase =
    mongoClient.getDatabase("plant-data-database")
val mongoCollection =
    mongoDatabase.getCollection("plant-data-collection")
Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
val pipeline = listOf(Document("\$group", Document("_id", "\$type")
            .append("totalCount", Document("\$sum", 1))))
val aggregationTask =
    mongoCollection.aggregate(pipeline).iterator()
aggregationTask.getAsync { task: App.Result<MongoCursor<Document>> ->
    if (task.isSuccess) {
        val results = task.get()
        Log.d("EXAMPLE", "successfully aggregated the plants by type. Type summary:")
        while (results.hasNext()) {
            Log.v("EXAMPLE", results.next().toString())
        }
    } else {
        Log.e("EXAMPLE", "failed to aggregate documents with: ${task.error}")
    }
}
