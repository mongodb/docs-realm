The Java SDK does not provide a method to remove an unnamed subscription
directly. However, you can look up a subscription by query, and pass the
subscription to the :java-sdk:`MutableSubscriptionSet.remove()
<io/realm/mongodb/sync/MutableSubscriptionSet.html#remove(io.realm.mongodb.sync.Subscription)>`
method to remove it from the subscription set.
