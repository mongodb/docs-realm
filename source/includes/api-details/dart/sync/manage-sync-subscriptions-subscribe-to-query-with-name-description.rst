To subscribe to a query with a name, pass the following arguments to ``subscribe()``:

- ``RealmResults query``: Required. A ``RealmResults`` object that you can create using the
  :ref:`Realm Query Language <rql>`.
- ``String name``: Optional. Name for the subscription that you can refer to. 

In the following example, we subscribe to two new named queries.
