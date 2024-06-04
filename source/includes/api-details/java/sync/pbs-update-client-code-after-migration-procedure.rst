.. procedure::

   .. step:: Update the SyncConfiguration

      Update your :java-sdk:`SyncConfiguration.Builder 
      <io/realm/mongodb/sync/SyncConfiguration.Builder.html>` to use 
      :ref:`Flexible Sync <sdks-configure-and-open-synced-database>`. This involves
      removing the ``partitionValue`` and adding a set of initial subscriptions, 
      if needed.

   .. step:: Add Properties to Object Models

      .. include:: /includes/pbs-to-fs-migration-add-relevant-properties-to-models.rst

   .. step:: Remove Automatic Subscriptions and Manually Create New Ones

      Remove automatic Flexible Sync subscriptions. If you did not add initial 
      subscriptions in the ``SyncConfiguration.Builder``, manually create the
      relevant subscriptions.

      .. include:: /includes/pbs-to-fs-migration-remove-and-add-subscriptions.rst
