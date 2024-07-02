To add an object to a database, instantiate it as you would any other object
and then pass it to :js-sdk:`Realm.create() <classes/Realm-1.html#create>` inside of a
write transaction. If the database :ref:`schema <sdks-file-schema>` includes
the object type and the object conforms to the schema, then the SDK
stores the object, which is now *managed* by the database instance.
