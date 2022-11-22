    import { mapTo } from 'realm';
    class Car extends Realm.Object<Car> {
      _id!: Realm.BSON.ObjectId;
      @index
      make!: string;
      model!: string;
      @mapTo("miles")
      odometer: number = 0; // Set the car with a default of 0 miles travelled

      static primaryKey = '_id'; // specify the primary key is the _id field

      constructor(realm: Realm, _id: Realm.BSON.ObjectId, make: string, model: string, odometer: number ) {
        super(realm, { _id, make, model, odometer,});
      }
    }
