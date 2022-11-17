import Realm from "realm";

describe("Define a Realm Object Schema", () => {
  test("should define realm object types with js classes", async () => {
    // :snippet-start: define-a-realm-object-schema-define-js-classes
    class Car extends Realm.Object<Car> {
      _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId(); // Set the car with a default ObjectId
      make!: string;
      model!: string;
      miles: number = 0; // Set the car with a default of 0 miles

      static primaryKey = '_id'; // specify the primary key is the ``_id`` field

      constructor(realm: Realm, make: string, model: string, miles: number, ) {
        super(realm, { make, model, miles});
      }
    }
    // :snippet-end:

    // :snippet-start: define-a-realm-object-schema-js-classes-open-and-access-properties
    const realm = await Realm.open({
      path: "myrealm",
      schema: [Car],
    });

    let car1: Car;
    realm.write(() => {
      // call to new Car() creates a new "Car" Realm.Object
      car1 = new Car(realm, "Nissan", "Sentra", 20510);
      // :hide-start:
      expect(car1.model).toBe("Sentra");
      // :hide-end:
    });
    // :snippet-end:
    
    // delete the car after its used
    realm.write(() => {
      realm.delete(car1);
    });
    // close the realm
    realm.close();
  });
});
