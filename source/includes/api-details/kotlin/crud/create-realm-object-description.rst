To create a new ``RealmObject`` instance, instantiate a new object of a
:ref:`realm object type <sdks-object-models>`.

In the following example, we instantiate a ``Frog`` object in a 
``realm.write()`` block, then pass the instantiated object to 
``copyToRealm()`` to return a managed instance:
