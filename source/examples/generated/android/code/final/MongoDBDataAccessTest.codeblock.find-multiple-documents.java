Document queryFilter  = new Document("_partition", "Store 42");
RealmResultTask<MongoCursor<Document>> findTask = mongoCollection.find(queryFilter).iterator();
findTask.getAsync(task -> {
    if (task.isSuccess()) {
        MongoCursor<Document> results = task.get();
        Log.v("EXAMPLE", "successfully found all plants for Store 42:");
        while (results.hasNext()) {
            Log.v("EXAMPLE", results.next().toString());
        }
        expectation.fulfill();
    } else {
        Log.e("EXAMPLE", "failed to find documents with: ", task.getError());
    }
});