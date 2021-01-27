Document queryFilter  = new Document("type", "perennial");
mongoCollection.findOne(queryFilter).getAsync(task -> {
    if (task.isSuccess()) {
        Document result = task.get();
        Log.v("EXAMPLE", "successfully found a document: " + result);
        expectation.fulfill();
    } else {
        Log.e("EXAMPLE", "failed to find document with: ", task.getError());
    }
});