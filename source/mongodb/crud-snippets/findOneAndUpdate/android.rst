.. code-block:: java

    // Find the document that describes "legos"
    Document query = new Document().append("name", "legos");

    // Set some fields in that document
    Document update = new Document().append("$set", new Document()
        .append("name", "blocks")
        .append("price", Decimal128.parse("20.99"))
        .append("category", "toys"));

    Document projection = new Document()
        .append("_id", 1)
        .append("name", 1)
        .append("price", 1);
    Document sort = new Document()
        .append("name", 1);

    RemoteFindOneAndModifyOptions options = new RemoteFindOneAndModifyOptions()
        // Return the updated document instead of the original document
        .returnNewDocument(true)
        .upsert(false)
        .sort(sort)
        .projection(projection);

    final Task <Document> findOneAndUpdateTask = itemsCollection.findOneAndUpdate(query, update, options);
    findOneAndUpdateTask.addOnCompleteListener(new OnCompleteListener <Document> () {
        @Override
        public void onComplete(@NonNull Task <Document> task) {
            if (task.getResult() == null) {
                Log.d("app", String.format("No document matches the provided query"));
            }
            else if (task.isSuccessful()) {
                Log.d("app", String.format("Successfully updated document: %s",
                        task.getResult()));
            } else {
                Log.e("app", "Failed to findOneAndUpdate: ", task.getException());
            }
        }
    });