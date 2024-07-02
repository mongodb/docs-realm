To create a ``RealmAny`` instance, use the
:java-sdk:`RealmAny.valueOf() <io/realm/RealmAny.html#valueOf-->` method
to assign an initial value or ``RealmAny.nullValue()`` to assign no
value. ``RealmAny`` instances are immutable just like ``String`` or
``Integer`` instances; if you want to assign a new value to a
``RealmAny`` field, you must create a new ``RealmAny`` instance.

.. warning:: Two Possible Null ``RealmAny`` Values

   ``RealmAny`` instances are always :ref:`nullable
   <sdks-optional-property-types>`. Additionally, instances can contain a
   value of type ``RealmAny.Type.NULL``.
