Data Model
~~~~~~~~~~

The examples on this page use a collection named ``store.items`` that
models various items available for purchase in an online store. Each
item has a ``name``, an inventory ``quantity``, and an array of customer
``reviews``.

.. code-block:: javascript

  // store.items
  {
      "_id": { "bsonType": "objectId" },
      name: { "bsonType": "string" },
      quantity: { "bsonType": "int" },
      reviews: {
        "bsonType": "array",
        "items": {
          "username": { "bsonType": "string" },
          "comment": { "bsonType": "string" }
        }
      }
  }
