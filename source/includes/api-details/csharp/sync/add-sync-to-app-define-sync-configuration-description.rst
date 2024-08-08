Device Sync requires a :dotnet-sdk:`FlexibleSyncConfiguration 
<reference/Realms.Sync.FlexibleSyncConfiguration.html>`
object to open a synced database. Note that 
this is different than the :dotnet-sdk:`RealmConfiguration
<reference/Realms.RealmConfiguration.html>` object that specifies some of the
base database options.

The ``FlexibleSyncConfiguration`` object requires an authenticated **User**.

You can optionally provide an **Initial Subscription**. This is the
subscription query that specifies the data to sync when the synced database is 
opened. You can update your subscriptions after you open the database.

If you do not provide an initial subscription as part of the Sync
configuration, you must manually add subscriptions before you can read from or
write to the database.

Refer to :ref:`sdks-manage-sync-subscriptions` for more information.

For additional database configuration parameters, refer to 
:ref:`sdks-configure-and-open-synced-database`.

For our example app, we define a configuration with an initial subscription
that queries all ``MyTask`` objects.
