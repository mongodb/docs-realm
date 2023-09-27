.. code-block:: typescript
   :emphasize-lines: 4, 12

   class ToOneManufacturer extends Realm.Object {
     _id!: BSON.ObjectId;
     name!: string;
     car?: Car; 

     static schema: Realm.ObjectSchema = {
       name: 'ToOneManufacturer',
       properties: {
         _id: 'objectId',
         name: 'string',
         // A manufacturer that may have one car
         car: 'Car?', 
       },
     };
   }

   class Car extends Realm.Object {
     _id!: BSON.ObjectId;
     model!: string;
     miles?: number;

     static schema: Realm.ObjectSchema = {
       name: 'Car',
       properties: {
         _id: 'objectId',
         model: 'string',
         miles: 'int?',
       },
     };
   }
