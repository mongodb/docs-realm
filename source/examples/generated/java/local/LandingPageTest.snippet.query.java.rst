.. code-block:: java

   RealmConfiguration config = new RealmConfiguration.Builder()
           .allowQueriesOnUiThread(true)
           .allowWritesOnUiThread(true)
           .build();

   Realm realm = Realm.getInstance(config);
   RealmQuery<Frog> frogsQuery = realm.where(Frog.class);

   long numTadpoles =
           frogsQuery.lessThan("age", 1).count();
   Log.i("EXAMPLE", "Tadpoles: "
           + numTadpoles);

   long numFrogsNamedJasonFunderburker =
           frogsQuery.equalTo("name", "Jason Funderburker").count();
   Log.i("EXAMPLE", "Frogs named Jason Funderburker: "
           + numFrogsNamedJasonFunderburker);

   long numFrogsWithoutOwners =
           frogsQuery.isNull("owner").count();
   Log.i("EXAMPLE", "Frogs without owners: "
           + numFrogsWithoutOwners);
