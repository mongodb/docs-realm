Unlike regular Realm objects, which map to their own MongoDB collection,
embedded objects map to embedded documents in the parent type's
:ref:`document schema <mongodb-document-schemas>`:

.. code-block:: json
   :emphasize-lines: 8-17

   {
     "title": "Contact",
     "bsonType": "object",
     "required": ["_id"],
     "properties": {
       "_id": { "bsonType": "objectId" },
       "name": { "bsonType": "string" },
       "address": {
         "title": "Address",
         "bsonType": "object",
         "properties": {
           "street": { "bsonType": "string" },
           "city": { "bsonType": "string" },
           "country": { "bsonType": "string" },
           "postalCode": { "bsonType": "string" }
         }
       }
     }
   }

.. code-block:: json
   :emphasize-lines: 8-20

   {
     "title": "Business",
     "bsonType": "object",
     "required": ["_id", "name", "addresses"],
     "properties": {
       "_id": "objectId",
       "name": { "bsonType": "string" },
       "addresses": {
         "bsonType": "array",
         "items": {
           "title": "Address",
           "bsonType": "object",
           "properties": {
             "street": { "bsonType": "string" },
             "city": { "bsonType": "string" },
             "country": { "bsonType": "string" },
             "postalCode": { "bsonType": "string" }
           }
         }
       }
     }
   }
