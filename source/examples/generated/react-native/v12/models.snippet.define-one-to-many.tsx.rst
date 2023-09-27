.. code-block:: typescript

   class ToManyManufacturer extends Realm.Object {
     _id!: BSON.ObjectId;
     name!: string;
     cars!: Realm.List<LinkedCar>;

     static schema: Realm.ObjectSchema = {
       name: 'ToManyManufacturer',
       properties: {
         _id: 'objectId',
         name: 'string',
         // A manufacturer that may have many cars
         cars: 'LinkedCar[]',
       },
     };
   }

   class LinkedCar extends Realm.Object {
     _id!: BSON.ObjectId;
     model!: string;
     miles?: number;
     manufacturer!: Realm.List<ToManyManufacturer>;

     static schema: Realm.ObjectSchema = {
       name: 'LinkedCar',
       properties: {
         _id: 'objectId',
         model: 'string',
         miles: 'int?',
         manufacturer: {
           type: 'linkingObjects',
           objectType: 'ToManyManufacturer',
           property: 'cars',
         },
       },
     };
   }
