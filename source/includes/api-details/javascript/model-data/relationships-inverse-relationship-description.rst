To define an inverse relationship, define a ``linkingObjects`` property in your
object model. ``linkingObjects`` specifies the object type and
property name of the relationship that it inverts.

.. literalinclude:: /examples/generated/node/v12/relationships.test.snippet.define-inverse.js
   :language: javascript

**Dynamically Obtain an Inversely Linked Object**

You can dynamically retrieve an object with an inverse relationship without
defining a ``linkingObjects`` type in its schema. Remove the
``linkingObjects`` type from your schema, so your schemas look like a standard
**to-many** relationship. When you need to retrieve the linked object, call the
:js-sdk:`Realm.Object.linkingObjects() <classes/Object.html#linkingObjects>`
query.

In the following continuation from the inverse relationship example, we 
have removed the ``manufacturer`` field with type 'linkingObjects' from 
the ``Car`` schema. An application developer creates several manufacturers 
and car objects, and the application pushes the newly-created cars into a 
manufacturer's ``cars`` field. 
   
To find the manufacturer who makes a specific car object, call ``.linkingObjects()``
and pass the "Manufacturer" class name and "cars" field as parameters.

The ``.linkingObjects()`` method returns a Results collection of objects whose
property inverts the relationship. In this example, only one manufacturer makes
the Sentra car model, so we can expect that manufacturer to be named Nissan.
