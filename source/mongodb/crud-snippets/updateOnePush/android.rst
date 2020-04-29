.. code-block:: java

  Document filterDoc = new Document().append("name", "football");
  Document updateDoc = new Document().append("$push",
      new Document().append("reviews", new Document()
          .append("username", "stitchfan2020")
          .append("comment", "what a neat product")
      )
  );

  final Task <RemoteUpdateResult> updateTask = 
    itemsCollection.updateOne(filterDoc, updateDoc);
  updateTask.addOnCompleteListener(new OnCompleteListener <RemoteUpdateResult> () {
      @Override
      public void onComplete(@NonNull Task <RemoteUpdateResult> task) {
          if (task.isSuccessful()) {
              long numMatched = task.getResult().getMatchedCount();
              long numModified = task.getResult().getModifiedCount();
              Log.d("app", String.format("successfully matched %d and modified %d documents", 
                    numMatched, numModified));
          } else {
              Log.e("app", "failed to update document with: ", task.getException());
          }
      }
  });
