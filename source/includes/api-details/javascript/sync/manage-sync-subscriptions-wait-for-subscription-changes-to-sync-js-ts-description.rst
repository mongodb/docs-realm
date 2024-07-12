You can wait for subscription changes to sync in two ways:

- ``await`` the call to :js-sdk:`SubscriptionSet.update()
  <classes/Realm.App.Sync.SubscriptionSet.html#update>`, which returns a promise
  that resolves when the ``SubscriptionSet`` is synchronized, or is rejected if
  there was an error during synchronization.
- Explicitly call :js-sdk:`SubscriptionSet.waitForSynchronization()
  <classes/Realm.App.Sync.SubscriptionSet.html#waitForSynchronization>` to
  wait for the server to acknowledge this set of subscriptions and return the
  matching objects, or throw an error.
