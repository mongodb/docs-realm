Device Sync requires a :swift-sdk:`FlexibleSyncConfiguration 
<Extensions/User.html#/s:So7RLMUserC10RealmSwiftE25flexibleSyncConfiguration15clientResetMode31cancelAsyncOpenOnNonFatalErrors20initialSubscriptions05rerunmL0AC0B0V0F0VAC06ClienthI0O_SbyAC0E15SubscriptionSetVcSbtF>`
object to open a synced database. Note that 
this is different than the :swift-sdk:`Configuration
<Structs/Realm/Configuration.html>` object that specifies some of the base
database options.

The ``FlexibleSyncConfiguration`` can take an ``initialSubscriptions`` block
paired with a ``rerunOnOpen`` bool. The initial subscriptions are the
subscription queries that specify what data to sync when the synced database
is first opened. If your app needs it, you can pair this with ``reRunOnOpen``
to recalculate dynamic queries every time the app opens, such as syncing
documents within a date range.

You can update your subscriptions after the database is opened. Refer to
:ref:`sdks-manage-sync-subscriptions` for more information.

For additional configuration parameters, refer to 
:ref:`sdks-configure-and-open-synced-database`.

For our example app, we define a configuration with: 

- an initial subscription that queries ``Todo`` objects 
  for documents where the ``ownerId`` matches the ``user.id`` of the logged-in user
- a schema that includes our ``Todo`` object type
