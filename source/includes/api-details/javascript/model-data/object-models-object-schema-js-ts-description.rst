When you create an SDK object model class, you define the type's ``name`` and
``properties`` in a static property called ``schema``.

When the SDK model extends ``Realm.Object``, you pass the model class directly
to the database ``schema`` list, and it uses the ``schema`` property in your
model class as a part of the database schema.

When the SDK model does *not* extend ``Realm.Object``, as when it is an
embedded object, you pass only the object's schema to the database ``schema``
list. You cannot pass the object itself directly to the database.

.. TODO: Verify that this is accurate
