.. code-block:: java

    Document query = new Document().append("quantity",
        new Document().append("$gte", 20));

    Document projection = new Document()
        .append("_id", 1)
        .append("quantity", 1);
    Document sort = new Document()
        .append("quantity", -1);

    RemoteFindOptions options = new RemoteFindOptions()
        .sort(sort)
        .projection(projection);

    final Task <Document> findOneAndUpdateTask = itemsCollection.findOne(query, options);
    findOneAndUpdateTask.addOnCompleteListener(new OnCompleteListener <Document> () {
        @Override
        public void onComplete(@NonNull Task <Document> task) {
            if (task.getResult() == null) {
                Log.d("app", String.format("No document matches the provided query"));
            }
            else if (task.isSuccessful()) {
                Log.d("app", String.format("Successfully found document: %s",
                    task.getResult()));
            } else {
                Log.e("app", "Failed to findOne: ", task.getException());
            }
        }
    });