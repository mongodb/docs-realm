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

    // :snippet-start: define-advanced-properties
    class CarOwner {
      static schema = {
        name: "CarOwner",
        properties: {
          _id: { type: "objectId", indexed: true },
          firstName: "string",
          last_name: { type: "string", mapTo: "lastName" },
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

describe("Define Relationship Properties", () => {
  test.skip("should define a to-one relationship", async () => {
    // :snippet-start: define-one-to-one
    class CarOwner {
      static schema = {
        name: "CarOwner",
        properties: {
          _id: "objectId",
          // A car owner can have one car
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
      schema: [CarOwner, Car],
    });

    let carOwner, car1;

    realm.write(() => {
      car1 = realm.create("Car", {
        _id: new BSON.ObjectID(),
        make: "Nissan",
        model: "Sentra",
        miles: 1000,
      });

      carOwner = realm.create("CarOwner", {
        _id: new BSON.ObjectID(),
        car: car1
      });
    });

    console.log(carOwner.car.carName);

    expect(carOwner.car.carName).toBe("Nissan Sentra");

    // delete the objects after they're used
    realm.write(() => {
      realm.delete(car1);
      realm.delete(carOwner);
    });

    // close the realm
    realm.close();
  });

  test.skip("should define a to-many relationship", async () => {
    // :snippet-start: define-one-to-many
    class CarOwner {
      static schema = {
        name: "CarOwner",
        properties: {
          _id: "objectId",
          // A car owner can have many cars
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
      schema: [CarOwner, Car],
    });

    let carOwner, car1, car2;

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

      carOwner = realm.create("CarOwner", {
        _id: new BSON.ObjectID(),
        cars: []
      });

      carOwner.cars.push(car1, car2);
    });

    console.log(carOwner.cars.length());

    expect(carOwner.cars.length()).toBe(1);

    // delete the objects after they're used
    realm.write(() => {
      realm.delete(car1);
      realm.delete(car2);
      realm.delete(carOwner);
    });

    // close the realm
    realm.close();
  });
});
