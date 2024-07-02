.. procedure::

   .. step:: Update the SyncConfiguration

      Add ``flexible:true`` to your 
      :js-sdk:`SyncConfiguration <types/FlexibleSyncConfiguration.html>` object 
      where you :ref:`open a synced database <sdks-configure-and-open-synced-database>`.

   .. step:: Add Properties to Object Models

      .. include:: /includes/pbs-to-fs-migration-add-relevant-properties-to-models.rst

   .. step:: Remove Automatic Subscriptions and Manually Create New Ones

      .. include:: /includes/pbs-to-fs-migration-remove-and-add-subscriptions.rst
