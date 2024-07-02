.. tip:: Bypass Migration During Development

   When **developing or debugging** your application, you may prefer to delete the
   realm instead of migrating it. Use the
   :realm-react-sdk:`BaseConfiguration.deleteRealmIfMigrationNeeded
   <types/Realm.BaseConfiguration.html>` property to delete the database automatically
   when a schema mismatch requires a migration. 

   Ensure that this property is always set to ``false`` for production apps.
   **Never release an app to production with this property set to true.**