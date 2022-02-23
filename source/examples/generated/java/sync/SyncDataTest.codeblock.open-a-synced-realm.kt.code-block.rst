.. code-block:: kotlin

   val user = app.currentUser()
   val config = SyncConfiguration.Builder(user, partition)
       .build()
   Realm.getInstanceAsync(config, object : Realm.Callback() {
       override fun onSuccess(realm: Realm) {
           Log.v("EXAMPLE", "Successfully opened a realm.")
           // read and write to realm here via transactions
       }
   })
