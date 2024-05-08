To add an object to a realm, instantiate it as you would any other object
and then pass it to :js-sdk:`Realm.create() <classes/Realm-1.html#create>` inside of a
write transaction. If the realm's :ref:`schema <node-realm-schema>` includes
the object type and the object conforms to the schema, then Realm
stores the object, which is now *managed* by the realm.
