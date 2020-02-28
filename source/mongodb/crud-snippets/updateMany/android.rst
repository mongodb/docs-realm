.. code-block:: java

  Document filterDoc = new Document();
  Document updateDoc = new Document().append("$mul", new Document().append("quantity", 10));

  final Task <RemoteUpdateResult> updateTask = 
    itemsCollection.updateMany(filterDoc, updateDoc);
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