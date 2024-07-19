To configure settings for a database, create a
:java-sdk:`SyncConfiguration <io/realm/mongodb/sync/SyncConfiguration.html>` with a
:java-sdk:`SyncConfiguration.Builder <io/realm/mongodb/sync/SyncConfiguration.Builder.html>`.

The following example configures a synced database with:

- Partition-Based Sync
- Synchronous reads explicitly allowed on the UI thread
- Synchronous writes explicitly allowed on the UI thread
- Explicit waiting for all backend changes to synchronize to the device
  before returning an open database
- Automatic compaction when launching the database to save file space

.. include:: /includes/java-synchronous-reads-writes-ui-thread-kotlin.rst
