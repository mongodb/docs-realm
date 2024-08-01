Use the :flutter-sdk:`Realm.subscriptions.state <realm/SubscriptionSet/state.html>`
property to read the current state of the subscription set.

The ``superseded`` state is a :flutter-sdk:`SubscriptionSetState
<realm/SubscriptionSetState.html>` that can occur when another thread updates a
subscription on a different instance of the subscription set. If the state
becomes ``superseded``, you must obtain a new instance of the subscription set
before you can update it.
