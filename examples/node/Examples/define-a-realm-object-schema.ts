import Realm from "realm";
import { index, mapTo, } from 'realm';

describe("Define a Realm Object Schema", () => {
  test.skip("should define realm object types with js classes", async () => {
    // :snippet-start: define-a-realm-object-schema-define-js-classes
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
    // :snippet-end:

    // :snippet-start: define-a-realm-object-schema-js-classes-open-and-access-properties
    const realm = await Realm.open({
      path: "myrealm",
      schema: [Car],
    });

    let car1!: Car;
    realm.write(() => {
      // call to new Car() creates a new "Car" Realm.Object
      car1 = new Car(realm, new Realm.BSON.ObjectId(), "Nissan", "Sentra", 20510);
    });
    console.log(car1.make)
    // // :snippet-end:

    expect(car1.model).toBe("Sentra");

    // delete the car after its used
    realm.write(() => {
      realm.delete(car1);
    });
    // close the realm
    realm.close();
  });

  test.skip("should map field to new field name", async () => {
        // :snippet-start: map-field-using-ts-first-model

        // :uncomment-start:
        // import { mapTo } from 'realm';
        // :uncomment-end:
        class Car extends Realm.Object<Car> {
          _id!: Realm.BSON.ObjectId;
          @index
          make!: string;
          model!: string;
          @mapTo("miles")
          odometer: number = 0; // Set the car with a default of 0 miles
    
          static primaryKey = '_id'; // specify the primary key is the _id field
    
          constructor(realm: Realm, _id: Realm.BSON.ObjectId, make: string, model: string, odometer: number ) {
            super(realm, { _id, make, model, odometer,});
          }
        }
        // :snippet-end:

  })
});
