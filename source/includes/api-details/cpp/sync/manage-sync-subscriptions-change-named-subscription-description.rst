To update a subscription set, use the ``subscription().updates()`` function.
This gives you access to a :cpp-sdk:`mutable_sync_subscription_set 
<structrealm_1_1mutable__sync__subscription__set.html>` where you can use the
``update_subscription()`` function to update a specific :cpp-sdk:`sync_subscription 
<structrealm_1_1sync__subscription.html>`.

You can change a ``sync_subscription``'s query in an update. You can add, remove,
or update the query string for a given ``sync_subscription``.
