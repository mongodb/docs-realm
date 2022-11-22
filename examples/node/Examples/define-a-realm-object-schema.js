import Realm from "realm";

describe("Define a Realm Object Schema", () => {
  test.skip("should define realm object types with js classes", async () => {
    // :snippet-start: define-a-realm-object-schema-define-js-classes
    class Car extends Realm.Object {
      static schema = {
        name: "Car",
        properties: {
          make: "string",
          model: "string",
          miles: "int",
        },
      };
      get carName() {
        return `${this.make} ${this.model}`;
      }
    }
    // :snippet-end:

    // :snippet-start: define-a-realm-object-schema-js-classes-open-and-access-properties
    const realm = await Realm.open({
      path: "myrealm",
      schema: [Car],
    });

    let car1;
    realm.write(() => {
      // call to new Car() creates a new "Car" Realm.Object
      car1 = new Car(realm, { make: "Nissan", model: "Sentra", miles: 20510 }) 
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

  test.skip("sshould define realm object types with js classes using a constructor", async () => {
    // :snippet-start: define-a-realm-object-schema-define-js-classes-with-constructor
    class Car extends Realm.Object {
      static schema = {
        name: "Car",
        properties: {
          make: "string",
          model: "string",
          miles: "int",
        },
      };
      constructor(make, model, miles) {
        const milesRounded = Math.round(miles);

        this.make = make;
        this.model = model;
        this.miles = milesRounded;
      }
    }
    // :snippet-end:
  })
});
