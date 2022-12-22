import Realm from "realm";

describe("Define a Realm Object Schema", () => {
  test.skip("should define realm object types with js classes", async () => {
    // :snippet-start: define-a-realm-object-schema-define-js-classes
    // :snippet-start: define-object-properties
    class Car {
      static schema = {
        name: "Car",
        // :snippet-start: define-optional-property
        properties: {
          _id: "objectId",
          make: "string",
          model: "string",
          miles: "int?",
        },
        // :snippet-end:
        primaryKey: '_id',
      };
      // :remove-start:
      get carName() {
        return `${this.make} ${this.model}`;
      }
      // :remove-end:
    }
    // :snippet-end:
    // :snippet-end:

    // :snippet-start: define-advanced-properties
    class CarOwner {
      static schema = {
        name: "CarOwner",
        properties: {
          _id: { type: "objectId", indexed: true },
          name: "string",
          numberOfCarsOwned: { type: "int", default: 0 },
        },
        primaryKey: '_id',
      };
    }
    // :snippet-end:

    // :snippet-start: define-a-realm-object-schema-js-classes-open-and-access-properties
    const realm = await Realm.open({
      path: "myrealm",
      schema: [Car],
    });

    let car1;
    realm.write(() => {
      car1 = realm.create("Car", {
        make: "Nissan",
        model: "Sentra",
        miles: 1000,
      });
    });
    console.log(car1.carName);
    // use car1
    // :snippet-end:

    expect(car1.carName).toBe("Nissan Sentra");
    // delete the car after its used
    realm.write(() => {
      realm.delete(car1);
    });
    // close the realm
    realm.close();
  });
});
