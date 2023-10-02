.. code-block:: typescript

   class ManufacturerInverse extends Realm.Object {
     _id!: BSON.ObjectId;
     name!: string;
     cars!: Realm.List<CarInverse>;

     static schema: Realm.ObjectSchema = {
       name: 'ManufacturerInverse',
       properties: {
         _id: 'objectId',
         name: 'string',
         // A manufacturer that may have many CarInverse objects
         cars: 'CarInverse[]',
       },
     };
   }

   class CarInverse extends Realm.Object {
     _id!: BSON.ObjectId;
     model!: string;
     manufacturer!: Realm.List<ManufacturerInverse>;
     miles?: number;

     static schema: Realm.ObjectSchema = {
       name: 'CarInverse',
       properties: {
         _id: 'objectId',
         model: 'string',
         miles: 'int?',
         manufacturer: {
           type: 'linkingObjects',
           objectType: 'ManufacturerInverse',
           property: 'cars',
         },
       },
     };
   }
