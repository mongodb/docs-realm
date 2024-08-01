The Java SDK does not provide a method to remove all unnamed subscriptions.

Instead, you can remove all subscriptions from the subscription set, with
:java-sdk:`removeAll() <io/realm/mongodb/sync/MutableSubscriptionSet.html#removeAll()>`.
Then, :ref:`create the new subscriptions
<sdks-sync-subscriptions-add-subscription>` that your app needs.
