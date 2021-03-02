.. code-block:: kotlin
   :emphasize-lines: 6, 7

   import io.realm.annotations.RealmModule
   import io.realm.annotations.RealmNamingPolicy

   @RealmModule(
       allClasses = true,
       classNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES, 
       fieldNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES 
   )
   class MyModule
