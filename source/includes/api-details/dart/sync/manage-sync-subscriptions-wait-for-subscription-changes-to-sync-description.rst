Use :flutter-sdk:`Realm.subscriptions.waitForSynchronization() <realm/SubscriptionSet/waitForSynchronization.html>`
to wait for the server to acknowledge this set of subscriptions.
If the server rejects the change, and an exception is thrown.

An exception may occur if:

- You subscribe to an unsupported query. Subscribing to an unsupported query will pause synchronization.
  To resume synchronization, :ref:`remove the unsupported query <sdks-remove-subscriptions>`.
- You are performing an invalid action, such as adding an object that does not match a subscription.
  This triggers a :ref:`client reset <client-resets>`: data is erased from the device,
  and a new copy of the data is created without any subscriptions in the set.
