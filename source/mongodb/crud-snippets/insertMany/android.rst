.. code-block:: java

    Document doc1 = new Document()
        .append("name", "basketball")
        .append("category", "sports")
        .append("quantity", 20)
        .append("reviews", Arrays.asList());

    Document doc2 = new Document()
        .append("name", "football")
        .append("category", "sports")
        .append("quantity", 30)
        .append("reviews", Arrays.asList());

    List<Document> docs = Arrays.asList(doc1, doc2);

    final Task <RemoteInsertManyResult> insertTask = itemsCollection.insertMany(docs);
    insertTask.addOnCompleteListener(new OnCompleteListener <RemoteInsertManyResult> () {
        @Override
        public void onComplete(@NonNull Task <RemoteInsertManyResult> task) {
            if (task.isSuccessful()) {
                Log.d("app",
                    String.format("successfully inserted %d items with ids: %s",
                        task.getResult().getInsertedIds().size(),
                        task.getResult().getInsertedIds().toString()));
            } else {
                Log.e("app", "failed to inserts document with: ", task.getException());
            }
        }
    });
