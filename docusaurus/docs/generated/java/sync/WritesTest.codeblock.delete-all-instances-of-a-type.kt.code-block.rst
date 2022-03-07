.. code-block:: kotlin

   realm.executeTransaction { r: Realm ->
       r.delete(Turtle::class.java)
   }
