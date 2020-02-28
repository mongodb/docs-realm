.. code-block:: java

    // Find the document that describes "legos"
    Document query = new Document().append("name", "legos");

    Document projection = new Document()
        .append("_id", 1)
        .append("name", 1)
        .append("price", 1);
    Document sort = new Document()
        .append("name", 1);

    // return the updated document has no effect
    // upsert has no effect
    RemoteFindOneAndModifyOptions options =
        new RemoteFindOneAndModifyOptions()
        .sort(sort)
        .projection(projection);

    final Task <Document> findOneAndDeleteTask =
        itemsCollection.findOneAndDelete(query, options, Document.class);
    findOneAndDeleteTask.addOnCompleteListener(new OnCompleteListener <Document> () {
        @Override
        public void onComplete(@NonNull Task <Document> task) {
            if (task.isSuccessful()) {
                Log.d("app", String.format("Successfully deleted document: %s",
                        task.getResult()));
            } else {
                Log.e("app", "Failed to findOneAndDelete: ", task.getException());
            }
        }
    });