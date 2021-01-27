mongoCollection.count().getAsync { task ->
    if (task.isSuccess) {
        val count = task.get()
        Log.v("EXAMPLE", "successfully counted, number of documents in the collection: $count")
        expectation.fulfill()
    } else {
        Log.e("EXAMPLE", "failed to count documents with: ${task.error}")
    }
}