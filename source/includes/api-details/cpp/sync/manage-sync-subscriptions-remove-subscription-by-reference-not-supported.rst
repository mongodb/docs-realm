C++ does not provide the ability to remove a subscription by reference. If
you know in advance that your app may need to remove subscriptions,
:ref:`create the subscription with a name <sdks-add-named-subscription>`.

Alternately, you can :ref:`remove all subscriptions
<sdks-remove-all-subscriptions>`, and then :ref:`add subscriptions
<sdks-sync-subscriptions-add-subscription>` that your app still needs.
