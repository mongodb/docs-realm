.. code-block:: java

   realm.executeTransaction(r -> {
       r.delete(Turtle.class);
   });
