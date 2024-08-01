Kotlin does not provide an API to directly remove an unnamed subscription.
However, you can you can look up the subscription by query and then pass
the reference to the subscription to :kotlin-sync-sdk:`MutableSubscriptionSet.remove()
<io.realm.kotlin.mongodb.sync/-mutable-subscription-set/remove.html>`.
