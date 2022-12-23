import Realm, { BSON } from "realm";

describe("Define a Realm Object Schema", () => {
  test.skip("should define realm object types with js classes", async () => {
    // :snippet-start: define-a-realm-object-schema-define-js-classes
    // :snippet-start: define-object-properties
    class Car {
      static schema = {
        name: "Car",
        properties: {
          _id: "objectId",
          make: "string",
          model: "string",
          miles: "int?",
        },
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

  test.skip("should define realm object advanced properties", async () => {
    // :snippet-start: define-advanced-properties
    class Car {
      static schema = {
        name: "Car",
        properties: {
          _id: { type: "objectId", indexed: true },
          make: "string",
          model_name: { type: "string", mapTo: "modelName" },
          miles: { type: "int", default: 0 },
        },
        primaryKey: '_id',
      };
    }
    // :snippet-end:
  });
});

describe("Define Relationship Properties", () => {
  test.skip("should define a to-one relationship", async () => {
    // :snippet-start: define-one-to-one
    class Manufacturer {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: "objectId",
          // A manufacturer that may have one car
          car: "Car?"
        },
      };
    }
    
    class Car {
      static schema = {
        name: "Car",
        properties: {
          _id: "objectId",
          make: "string",
          model: "string",
          miles: "int?",
        },
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      path: "myrealm",
      schema: [Manufacturer, Car],
    });

    let Manufacturer, car1;

    realm.write(() => {
      car1 = realm.create("Car", {
        _id: new BSON.ObjectID(),
        make: "Nissan",
        model: "Sentra",
        miles: 1000,
      });

      Manufacturer = realm.create("Manufacturer", {
        _id: new BSON.ObjectID(),
        car: car1
      });
    });

    console.log(Manufacturer.car.carName);

    expect(Manufacturer.car.carName).toBe("Nissan Sentra");

    // delete the objects after they're used
    realm.write(() => {
      realm.delete(car1);
      realm.delete(Manufacturer);
    });

    // close the realm
    realm.close();
  });

  test.skip("should define a to-many relationship", async () => {
    // :snippet-start: define-one-to-many
    class Manufacturer {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: "objectId",
          // A manufactuerer that may have many cars
          cars: "Car[]"
        },
      };
    }
    
    class Car {
      static schema = {
        name: "Car",
        properties: {
          _id: "objectId",
          make: "string",
          model: "string",
          miles: "int?",
        },
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      path: "myrealm",
      schema: [Manufacturer, Car],
    });

    let Manufacturer, car1, car2;

    realm.write(() => {
      car1 = realm.create("Car", {
        _id: new BSON.ObjectID(),
        make: "Nissan",
        model: "Sentra",
        miles: 1000,
      });

      car2 = realm.create("Car", {
        _id: new BSON.ObjectID(),
        make: "Hyundai",
        model: "Elantra",
        miles: 10000,
      });

      Manufacturer = realm.create("Manufacturer", {
        _id: new BSON.ObjectID(),
        cars: []
      });

      Manufacturer.cars.push(car1, car2);
    });

    console.log(Manufacturer.cars.length());

    expect(Manufacturer.cars.length()).toBe(1);

    // delete the objects after they're used
    realm.write(() => {
      realm.delete(car1);
      realm.delete(car2);
      realm.delete(Manufacturer);
    });

    // close the realm
    realm.close();
  });

  test.skip("should define an inverse relationship", async () => {
    // :snippet-start: define-inverse
    class Manufacturer {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: "objectId",
          // A manufacturer that may have many cars
          cars: "Car[]"
        },
      };
    }
    
    class Car {
      static schema = {
        name: "Car",
        properties: {
          _id: "objectId",
          make: "string",
          model: "string",
          miles: "int?",
          // Backlink to the Manufacturer. This is automatically updated whenever
          // this car is added to or removed from a Manufacturer's cars list.
          assignee: {
            type: "linkingObjects",
            objectType: "Manufacturer",
            property: "cars",
          }
        },
      };
    }
    // :snippet-end:
  });

  test.skip("should define an embedded object property", async () => {
    // :snippet-start: define-embedded-property
    class Manufacturer {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: "objectId",
          name: "string",
          // Embed an array of objects
          warranties: { type: "list", objectType: "Warranty" }
        },
      };
    }
    
    class Car {
      static schema = {
        name: "Car",
        properties: {
          _id: "objectId",
          make: "string",
          model: "string",
          miles: "int?",
          // Embed one object
          warranty: "Warranty",
        },
      };
    }

    class Warranty {
      static schema = {
        name: "Warranty",
        embedded: true,
        properties: {
          name: "string",
          termLength: "int",
          cost: "int",
        },
      };
    }
    // :snippet-end:
  });
});
