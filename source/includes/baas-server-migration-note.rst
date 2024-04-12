You can update your data model after you define it. The process of changing your 
Realm object schemas depends on whether you are working with a synced realm or 
an unsynced (local-only) realm.

Update a Data Model in a Synced Realm
-------------------------------------
If your app uses Atlas Device Sync to synchronize data with MongoDB Atlas, and 
you are working with a synced realm, schema changes are handled differently.

Synced realms:

- Support making non-breaking and breaking changes. For more information, refer to :ref:`Breaking Changes <destructive-changes-synced-schema>` in the App Services documentation.
- Support server-side versioning. Device SDKs do not currently support client-side 
  schema versioning in synced realms.
- Automatically migrate objects to the latest server-side schema version without 
  requiring a manual migration.

When working with a synced realm, you can update your schema in Atlas App Services 
and Device Sync will update the local realm file automatically the next time it 
connects. For more information on making server-side schema changes and handling 
the differences between the server-side schema and your client data model, refer 
to the :ref:`Update a Data Model <synced-schema-overview>` page in the App Services documentation.
