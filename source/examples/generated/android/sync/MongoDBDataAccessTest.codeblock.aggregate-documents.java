MongoClient mongoClient =
        user.getMongoClient("mongodb-atlas");
MongoDatabase mongoDatabase =
        mongoClient.getDatabase("plant-data-database");
MongoCollection<Document> mongoCollection =
        mongoDatabase.getCollection("plant-data-collection");
Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
List<Document> pipeline = Arrays.asList(
        new Document("$group", new Document("_id", "$type")
                .append("totalCount", new Document("$sum", 1))));
RealmResultTask<MongoCursor<Document>> aggregationTask = mongoCollection.aggregate(pipeline).iterator();
aggregationTask.getAsync(task -> {
    if (task.isSuccess()) {
        MongoCursor<Document> results = task.get();
        Log.d("EXAMPLE", "successfully aggregated the plants by type. Type summary:");
        while (results.hasNext()) {
            Log.v("EXAMPLE", results.next().toString());
        }
    } else {
        Log.e("EXAMPLE", "failed to aggregate documents with: ", task.getError());
    }
});
