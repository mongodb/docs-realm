.. procedure::

   .. step:: Update the Sync Configuration

      Switch to a :objc-sdk:`RLMUser -flexibleSyncConfiguration
      <Classes/RLMUser.html#/c:objc(cs)RLMUser(im)flexibleSyncConfiguration>`
      where you :ref:`open a synced database
      <sdks-configure-and-open-synced-database>`.

   .. step:: Add Properties to Object Models

      .. include:: /includes/pbs-to-fs-migration-add-relevant-properties-to-models.rst

   .. step:: Remove Automatic Subscriptions and Manually Create New Ones

      .. include:: /includes/pbs-to-fs-migration-remove-and-add-subscriptions.rst
