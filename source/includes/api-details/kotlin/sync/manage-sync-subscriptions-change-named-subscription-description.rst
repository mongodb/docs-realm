You can update subscriptions using
:kotlin-sync-sdk:`SubscriptionSet.update()
<io.realm.kotlin.mongodb.sync/-subscription-set/update.html>`.

In this example, we use :kotlin-sync-sdk:`MutableSubscriptionSet.add()
<io.realm.kotlin.mongodb.sync/-mutable-subscription-set/add.html>`.
to update the query for the subscription named ``"bob_smith_teams"``.

You must set the ``updateExisting`` parameter to ``true`` to update
a subscription - otherwise the SDK throws an exception.
