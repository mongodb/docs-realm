.. code-block:: kotlin

   val config = RealmConfiguration.Builder()
       .allowQueriesOnUiThread(true)
       .allowWritesOnUiThread(true)
       .build()
   val realm = Realm.getInstance(config)
   val frogsQuery = realm.where(Frog::class.java)

   val numTadpoles =
       frogsQuery.lessThan("age", 2).count()
   Log.i("EXAMPLE",
       "Tadpoles: $numTadpoles")

   val numFrogsNamedJasonFunderburker =
       frogsQuery.equalTo("name", "Jason Funderburker").count()
   Log.i("EXAMPLE",
       "Frogs named Jason Funderburker: $numFrogsNamedJasonFunderburker")

   val numFrogsWithoutOwners =
       frogsQuery.isNull("owner").count()
   Log.i("EXAMPLE",
       "Frogs without owners: $numFrogsWithoutOwners")
