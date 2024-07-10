You can define SDK models as JavaScript classes that extend ``Realm.Object``.

When you create objects, use an object literal. This lets you create an
**unmanaged** object, and pass it to the database when it makes sense to do so.

Do not use ``new`` to construct a new object instance. If you use ``new`` with
class-based models, this creates a new **managed** object, which has the
following side effects:

- Constructing a ``new`` object calls the ``realm.create()`` method, which can
  only be used in a write transcation.
- Constructing a ``new`` object has complications when the object contains or
  is itself an embedded object.

For more information about object creation and managed objects, refer to
:ref:`sdks-crud-create` and :ref:`sdks-create-specific-object-types`.
