class Car extends Realm.Object<Car> {
  _id!: Realm.BSON.ObjectId;
  make!: string;
  model!: string;
  miles: number = 0; // Set the car with a default of 0 miles

  static primaryKey = '_id'; // specify the primary key is the _id field

  constructor(realm: Realm, _id: Realm.BSON.ObjectId, make: string, model: string, miles: number ) {
    super(realm, { _id, make, model, miles,});
  }
}
