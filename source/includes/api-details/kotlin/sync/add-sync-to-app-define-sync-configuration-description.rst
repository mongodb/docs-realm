Device Sync requires a :kotlin-sync-sdk:`SyncConfiguration 
<io.realm.kotlin.mongodb.sync/-sync-configuration/index.html>`
object to open a synced database. Note that 
this is different than the ``RealmConfiguration`` object that specifies some
of the base database options.

The ``SyncConfiguration`` object requires the following:

- **User**: the authenticated user object.
- **Schema**: all object types that you want to include in this database. 
- **Initial Subscription**: the subscription query 
  that specifies the data to sync when the synced database is 
  initially opened. You can update your subscriptions 
  after the database is opened. Refer to 
  :ref:`sdks-manage-sync-subscriptions` for more information.

For additional configuration parameters, refer to 
:ref:`sdks-configure-and-open-synced-database`.

For our example app, we define a configuration with: 

- a schema that includes our ``List`` and ``Item`` objects
- an initial subscription that queries all ``List`` objects 
  that the user owns and all incomplete ``Item`` objects
