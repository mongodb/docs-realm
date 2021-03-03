.. code-block:: kotlin
   :emphasize-lines: 3

   val config = RealmConfiguration.Builder()
       .assetFile("bundled.realm")
       .readOnly() 
       .modules(BundledRealmModule())
       .build()
   val realm = Realm.getInstance(config)
