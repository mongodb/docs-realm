You can dynamically retrieve an object with an inverse relationship without
defining a ``linkingObjects`` type in its schema. When you need to retrieve
the linked object, call the :js-sdk:`Realm.Object.linkingObjects()
<classes/Object.html#linkingObjects>` query.

The ``.linkingObjects()`` method returns a :ref:`Results collection 
<sdks-read-access-results>` of objects whose property inverts the relationship. 

In this example, only one manufacturer makes the Sentra car model, so we 
can expect that manufacturer to be named Nissan.
