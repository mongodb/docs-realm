To open a :ref:`Partition-Based Sync <partition-based-sync>` database,
pass a user, a partition, and a set of SDK object schemas to
:kotlin-sync-sdk:`SyncConfiguration.Builder()
<io.realm.kotlin.mongodb.sync/-sync-configuration/-builder/-builder.html>`.
Then, pass the configuration to :kotlin-sdk:`Realm.open()
<io.realm.kotlin/-realm/-companion/open.html>` to open
an instance of the database:
