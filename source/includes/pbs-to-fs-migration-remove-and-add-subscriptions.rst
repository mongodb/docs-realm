When you migrate from Partition-Based Sync to Flexible Sync, the SDK
automatically creates hidden Sync subscriptions for your app. The 
next time you add or change subscriptions, we recommend that you:

1. :ref:`Remove the automatically-generated subscriptions <sdks-remove-sync-subscriptions>`. 
2. :ref:`Manually add the relevant subscriptions in your client codebase <sdks-add-sync-subscriptions>`.

This enables you to see all of your subscription logic together in your 
codebase for future iteration and debugging.

For more information about the automatically-generated Sync 
subscriptions, refer to :ref:`realm-sync-migrate-client`.
