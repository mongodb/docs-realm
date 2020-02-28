.. code-block:: java

  Document filterDoc = new Document()
      .append("reviews.0", new Document().append("$exists", true));

  RemoteFindIterable findResults = itemsCollection
      .find(filterDoc)
      .projection(new Document().append("_id", 0))
      .sort(new Document().append("name", 1));

  // One way to iterate through
  findResults.forEach(item -> {
      Log.d("app", String.format("successfully found:  %s", item.toString()));
  });

  // Another way to iterate through
  Task <List<Document>> itemsTask = findResults.into(new ArrayList<Document>());
  itemsTask.addOnCompleteListener(new OnCompleteListener <List<Document>> () {
      @Override
      public void onComplete(@NonNull Task<List<Document>> task) {
          if (task.isSuccessful()) {
              List<Document> items = task.getResult();
              Log.d("app", String.format("successfully found %d documents", items.size()));
              for (Document item: items) {
                  Log.d("app", String.format("successfully found:  %s", item.toString()));
              }
          } else {
              Log.e("app", "failed to find documents with: ", task.getException());
          }
      }
  });