.. code-block:: java

   List<Document> aggregationPipeLine = List.of(
       new Document(
           "$group", new Document()
               .append("_id", "$customerId")
               .append("numPurchases", new Document(
                   "$sum", 1
               ))
               .append("numItemsPurchased", new Document(
                   "$sum", new Document("$size", "$items")
               ))
       ),
       new Document(
           "$addFields", new Document(
               "averageNumItemsPurchased", new Document(
                   "$divide", List.of("$totalQuantity", "$count")
               )
           )
       )
   );

   purchasesCollection.aggregate(aggregationPipeLine).forEach(item -> {
       Log.d("app", String.format("aggregation result:  %s", item.toString()));
   });

   // Another way to iterate through
   Task<List<Document>> itemsTask = purchasesCollection
       .aggregate(aggregationPipeLine)
       .into(new ArrayList<Document>());
   itemsTask.addOnCompleteListener(new OnCompleteListener <List<Document>> () {
       @Override
       public void onComplete(@NonNull Task <List<Document>> task) {
           if (task.isSuccessful()) {
               List<Document> items = task.getResult();
               Log.d("app", String.format("%d aggregation results", items.size()));
               for (Document item: items) {
                   Log.d("app", String.format("aggregation result:  %s", item.toString()));
               }
           } else {
               Log.e("app", "failed to perform aggregation with: ", task.getException());
           }
       }
   });
