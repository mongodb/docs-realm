.. code-block:: kotlin

   realm.executeTransaction { r: Realm ->
       r.deleteAll()
   }
