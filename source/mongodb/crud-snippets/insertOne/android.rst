.. code-block:: java

    Document newItem = new Document()
        .append("name", "legos")
        .append("quantity", 10)
        .append("category", "toys")
        .append("reviews", Arrays.asList(
            new Document()
            .append("username", "mongolover")
            .append("comment", "this is great")
        ));


    final Task <RemoteInsertOneResult> insertTask = itemsCollection.insertOne(newItem);
    insertTask.addOnCompleteListener(new OnCompleteListener <RemoteInsertOneResult> () {
        @Override
        public void onComplete(@NonNull Task <RemoteInsertOneResult> task) {
            if (task.isSuccessful()) {
                Log.d("app", String.format("successfully inserted item with id %s",
                    task.getResult().getInsertedId()));
            } else {
                Log.e("app", "failed to insert document with: ", task.getException());
            }
        }
    });
