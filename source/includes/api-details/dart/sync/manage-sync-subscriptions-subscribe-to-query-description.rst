To subscribe to a query, pass the following arguments to ``subscribe()``:

- ``RealmResults query``: Required. A ``RealmResults`` object that you can
  create using the :ref:`Realm Query Language <rql>`.
- ``String name``: Optional. Name for the subscription that you can refer to. 
- ``bool update``:  Optional. When true, adding a subscription with an existing
  name replaces the existing query with the new query. When false, the SDK
  throws an exception for duplicate subscriptions. Only use with named
  subscriptions.

In the following example, we subscribe to two new named queries.
