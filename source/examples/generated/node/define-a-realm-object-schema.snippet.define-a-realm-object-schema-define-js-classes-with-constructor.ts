    class Car extends Realm.Object<Car> {
      _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
      make!: string;
      model!: string;
      miles: number = 0; // Set the car with a default of 0 miles travelled

      static primaryKey = '_id'; // specify the primary key is the _id field

      constructor(realm: Realm, _id: Realm.BSON.ObjectId, make: string, model: string, miles: number ) {
        const milesRounded = Math.round(miles);
        super(realm, { _id, make, model, miles: milesRounded,});
      }
    }
