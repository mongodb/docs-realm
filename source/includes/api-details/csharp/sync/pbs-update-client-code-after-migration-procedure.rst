.. procedure::

   .. step:: Update the SyncConfiguration

      Change your 
      :dotnet-sdk:`PartitionSyncConfiguration <reference/Realms.Sync.PartitionSyncConfiguration.html>`
      to a
      :dotnet-sdk:`FlexibleSyncConfiguration <reference/Realms.Sync.FlexibleSyncConfiguration.html>`.

   .. step:: Add Properties to Object Models

      .. include:: /includes/pbs-to-fs-migration-add-relevant-properties-to-models.rst

   .. step:: Remove Automatic Subscriptions and Manually Create New Ones

      .. include:: /includes/pbs-to-fs-migration-remove-and-add-subscriptions.rst
