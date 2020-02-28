.. code-block:: java
   :emphasize-lines: 3

   Document query = new Document("reviews.0", new Document("$exists", true));

   itemsCollection.count(query).addOnCompleteListener(new OnCompleteListener <Long> () {
       @Override
       public void onComplete(@NonNull Task <Long> task) {
           if (task.isSuccessful()) {
               Long numDocs = task.getResult();
               Log.d("app", String.format("%s items have a review.", numDocs.toString()));
           } else {
               Log.e("app", "Failed to count documents with exception: ", task.getException());
           }
       }
   });
