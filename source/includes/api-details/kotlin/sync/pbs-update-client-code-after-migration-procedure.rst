.. procedure::

   .. step:: Update the SyncConfiguration

      Update your :kotlin-sync-sdk:`SyncConfiguration.Builder()
      <io.realm.kotlin.mongodb.sync/-sync-configuration/-builder/-builder.html>` 
      to use Flexible Sync where you :ref:`open a synced database
      <sdks-configure-and-open-synced-database>`. This involves removing the
      ``partitionValue`` and adding a set of initial subscriptions, if needed.

   .. step:: Add Properties to Object Models

      .. include:: /includes/pbs-to-fs-migration-add-relevant-properties-to-models.rst

   .. step:: Remove Automatic Subscriptions and Manually Create New Ones

      .. include:: /includes/pbs-to-fs-migration-remove-and-add-subscriptions.rst
