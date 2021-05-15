.. code-block:: javascript

   // Get on-disk location of the default Realm
   Realm.open({}).then(realm => {
       console.log("Realm is located at: " + realm.path);
   });