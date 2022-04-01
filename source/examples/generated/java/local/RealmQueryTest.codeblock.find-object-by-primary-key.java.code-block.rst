.. code-block:: java

   RealmConfiguration config = new RealmConfiguration.Builder()
           .allowQueriesOnUiThread(true)
           .allowWritesOnUiThread(true)
           .build();

   Realm.getInstanceAsync(config, new Realm.Callback() {
       @Override
       public void onSuccess(Realm realm) {
           Log.v(
                   "EXAMPLE",
                   "Successfully opened a realm with reads and writes allowed on the UI thread."
           );


           realm.executeTransaction( transactionRealm -> {
               DefinitelyNotJavaTask task = transactionRealm.where(DefinitelyNotJavaTask.class).equalTo("name", PRIMARY_KEY_VALUE.get()).findFirst();
               Log.v("EXAMPLE", "Fetched object by primary key: " + task);
           });
           realm.close();
       }
   });
