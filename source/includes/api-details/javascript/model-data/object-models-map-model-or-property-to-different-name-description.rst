**Map a Model Name**

To use a different class name in your code than is stored in the database:

1. Set the ``name`` property of your SDK object's **schema** to the name
   that you want to use to store the object.

#. Use the **class** name in the database configuration's ``schema`` property
   when you :ref:`open the database <sdks-provide-a-subset-of-models-to-a-database>`.

#. Use the mapped name for performing CRUD operations or when defining
   Sync Subscriptions.

In the following example, the SDK stores objects created with the
``Task`` class as ``Todo_Item``.

.. literalinclude::  /examples/generated/node/v12/define-a-realm-object-schema.test.snippet.remap-class-name.js
   :language: javascript
   :emphasize-lines: 5, 18, 27, 39, 47

**Map a Property Name**

To use a different property name in your code than is stored in the database,
set ``mapTo`` to the name of the property as it appears in your code.

In the following ``Car`` object schema, the database stores the car's
model name with the snake case ``model_name`` property. The schema maps the property
to ``modelName`` for objects used in client code.
