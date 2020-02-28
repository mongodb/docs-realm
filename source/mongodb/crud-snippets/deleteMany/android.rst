.. code-block:: java

  Document filterDoc = new Document().append("reviews", new Document().append("$size", 0));

  final Task <RemoteDeleteResult> deleteTask = itemsCollection.deleteMany(filterDoc);
  deleteTask.addOnCompleteListener(new OnCompleteListener <RemoteDeleteResult> () {
      @Override
      public void onComplete(@NonNull Task <RemoteDeleteResult> task) {
          if (task.isSuccessful()) {
              long numDeleted = task.getResult().getDeletedCount();
              Log.d("app", String.format("successfully deleted %d documents", numDeleted));
          } else {
              Log.e("app", "failed to delete document with: ", task.getException());
          }
      }
  });