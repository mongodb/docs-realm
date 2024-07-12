You can watch the state of the subscription set with the 
:java-sdk:`SubscriptionSet.State <io/realm/mongodb/sync/SubscriptionSet.State.html>` enum.
You can use subscription state to:

- Show a progress indicator while data is downloading
- Find out when a subscription set becomes superseded

You can access the state of your application's subscription set using
:java-sdk:`SubscriptionSet.getState() <io/realm/mongodb/sync/SubscriptionSet.html#getState()>`.

Superseded
``````````

``SUPERSEDED`` is a ``SubscriptionSet.State`` that can occur when another
thread writes a subscription on a different instance of the 
subscription set. If the state becomes ``SUPERSEDED``, you must obtain 
a new instance of the subscription set before you can write to it.
