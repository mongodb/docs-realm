import Realm from "realm";

describe("Define Relationship Properties", () => {
  test("should define a to-one relationship", async () => {
    // :snippet-start: define-one-to-one
    class Manufacturer extends Realm.Object {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: {
            type: "objectId",
          },
          name: {
            type: "string",
          },
          // A manufacturer that may have one car
          car: {
            type: "object",
            objectType: "Car",
            optional: true,
          },
        },
      };
    }

    class Car extends Realm.Object {
      static schema = {
        name: "Car",
        properties: {
          _id: {
            type: "objectId",
          },
          model: {
            type: "string",
          },
          miles: {
            type: "int",
            optional: true,
          },
        },
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car],
    });
    expect(realm.isClosed).toBe(false);

    realm.write(() => {
      const thisCar = realm.create(Car, {
        _id: new Realm.BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
      });

      realm.create(Manufacturer, {
        _id: new Realm.BSON.ObjectID(),
        name: "Nissan",
        car: thisCar,
      });
    });

    const manufacturers = realm.objects(Manufacturer);

    const manufacturerCar = manufacturers[0].car;

    expect(manufacturerCar?.model).toBe("Sentra");

    // close the realm
    realm.close();
  });

  test("should define a to-many relationship", async () => {
    // :snippet-start: define-one-to-many
    class Manufacturer extends Realm.Object {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: {
            type: "objectId",
          },
          name: {
            type: "string",
          },
          // A manufacturer that may have many cars
          cars: {
            type: "list",
            objectType: "Car",
          },
        },
      };
    }

    class Car extends Realm.Object {
      static schema = {
        name: "Car",
        properties: {
          _id: {
            type: "objectId",
          },
          model: {
            type: "string",
          },
          miles: {
            type: "int",
            optional: true,
          },
        },
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car],
    });
    expect(realm.isClosed).toBe(false);

    realm.write(() => {
      const sentra = realm.create(Car, {
        _id: new Realm.BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
      });

      const pathfinder = realm.create(Car, {
        _id: new Realm.BSON.ObjectID(),
        model: "Pathfinder",
        miles: 254,
      });

      realm.create(Manufacturer, {
        _id: new Realm.BSON.ObjectID(),
        name: "Nissan",
        cars: [sentra, pathfinder],
      });
    });

    const manufacturers = realm.objects(Manufacturer);

    const manufacturerCars = manufacturers[0].cars;

    // Get the Manufacturer who makes the Car
    // The below fails with 'Manufacturer#cars is not a relationship to 'Car'
    // const carObjects = realm.objects(Car);
    // const linkedManufacturer = carObjects[0].linkingObjects(
    //   "Manufacturer",
    //   "cars"
    // )[0];

    expect(manufacturerCars[0].model).toBe("Sentra");
    expect(manufacturerCars[1].model).toBe("Pathfinder");
    //expect(linkedManufacturer.name).toMatchObject("Nissan");

    // close the realm
    realm.close();
  });

  test("should define an inverse relationship", async () => {
    // :snippet-start: define-inverse
    class Manufacturer extends Realm.Object {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: {
            type: "objectId",
          },
          name: {
            type: "string",
          },
          // A manufacturer that may have many cars
          cars: {
            type: "list",
            objectType: "Car",
          },
        },
      };
    }

    class Car extends Realm.Object {
      static schema = {
        name: "Car",
        properties: {
          _id: {
            type: "objectId",
          },
          model: {
            type: "string",
          },
          miles: {
            type: "int",
            optional: true,
          },
          manufacturer: {
            type: "linkingObjects",
            objectType: "Manufacturer",
            property: "cars",
          },
        },
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car],
    });
    expect(realm.isClosed).toBe(false);

    const manufacturerObjectId = new Realm.BSON.ObjectId();
    realm.write(() => {
      const sentra = realm.create(Car, {
        _id: new Realm.BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
      });

      realm.create(Manufacturer, {
        _id: manufacturerObjectId,
        name: "Nissan",
        cars: [sentra],
      });
    });

    const carRealmObjects = realm.objects(Car);
    expect(carRealmObjects.length).toBe(1);

    const sentraManufacturerCollection = carRealmObjects[0].manufacturer;
    const sentraManufacturer = sentraManufacturerCollection[0];
    expect(sentraManufacturer._id).toMatchObject(manufacturerObjectId);
    const carsWithManufacturerMatchingId = carRealmObjects.filtered(
      "manufacturer._id == $0",
      manufacturerObjectId
    );
    // If the backlink was set properly, the car object we created should
    // match the filter looking for manufacturers matching the OID
    const fiteredCarWithManufacturerMatchingId =
      carsWithManufacturerMatchingId[0];
    expect(fiteredCarWithManufacturerMatchingId.model).toBe("Sentra");

    // close the realm
    realm.close();
  });

  test("should define an embedded object", async () => {
    // :snippet-start: define-embedded-object
    class Manufacturer extends Realm.Object {
      static schema = {
        name: "Manufacturer",
        properties: {
          _id: {
            type: "objectId",
          },
          name: {
            type: "string",
          },
          cars: {
            type: "list",
            objectType: "Car",
          },
          // Embed an array of objects
          warranties: {
            type: "list",
            objectType: "Warranty",
          },
        },
      };
    }

    class Car extends Realm.Object {
      static schema = {
        name: "Car",
        properties: {
          _id: {
            type: "objectId",
          },
          model: {
            type: "string",
          },
          miles: {
            type: "int",
            optional: true,
          },
          // Embed one object
          warranty: {
            type: "object",
            objectType: "Warranty",
            optional: true,
          },
        },
      };
    }

    class Warranty extends Realm.Object {
      static schema = {
        name: "Warranty",
        embedded: true,
        properties: {
          name: {
            type: "string",
          },
          termLength: {
            type: "int",
          },
          cost: {
            type: "int",
          },
        },
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car, Warranty],
    });
    expect(realm.isClosed).toBe(false);

    const manufacturerObjectId = new Realm.BSON.ObjectId();
    realm.write(() => {
      const sentra = realm.create(Car, {
        _id: new Realm.BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
        warranty: {
          name: "Premium",
          termLength: 12,
          cost: 500,
        },
      });

      realm.create(Manufacturer, {
        _id: manufacturerObjectId,
        name: "Nissan",
        cars: [sentra],
        warranties: [
          {
            name: "Premium",
            termLength: 12,
            cost: 500,
          },
        ],
      });
    });

    const carRealmObjects = realm.objects("Car");
    expect(carRealmObjects.length).toBe(1);
    expect(carRealmObjects[0].warranty.name).toBe("Premium");

    const carsWithWarrantyMatchingName = carRealmObjects.filtered(
      "warranty.name == $0",
      "Premium"
    );
    expect(carsWithWarrantyMatchingName.length).toBe(1);

    const manufacturerRealmObjects = realm.objects("Manufacturer");
    const manufacturerWithWarrantyMatchingName =
      manufacturerRealmObjects.filtered("ANY warranties.name == $0", "Premium");
    expect(manufacturerWithWarrantyMatchingName.length).toBe(1);

    // close the realm
    realm.close();
  });
});
