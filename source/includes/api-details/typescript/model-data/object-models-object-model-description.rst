You can define SDK models as TypeScript classes that extend ``Realm.Object``
(like most of the examples on this page). Or you can define models as
TypeScript objects.

When you define models as TypeScript classes that extend ``Realm.Object``,
you can pass those model objects directly to the database. Prefer this approach
when possible.

If you do define a model that does not extend ``Realm.Object``, you cannot pass
the model directly to the database. Instead, you pass only the schema to the
database that manages the object.

.. TODO: Provide more info about why you would choose one of these approaches over the other
