To find a specific subscription by name, call the 
:swift-sdk:`subscriptions.first(named: )
<Structs/SyncSubscriptionSet.html#/s:10RealmSwift19SyncSubscriptionSetV5first5namedAA0cD0VSgSS_tF>`
method with the name of a subscription.

You can also find a subscription matching a specific query by calling one of
the variants of :swift-sdk:`subscriptions.first(ofType: where:)
<Structs/SyncSubscriptionSet.html#/s:10RealmSwift19SyncSubscriptionSetV5firstAA0cD0VSgvp>`
method with the SDK object type and a query, query builder, or NSPredicate
argument.
