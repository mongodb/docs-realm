import Realm, { kmToRadians } from "realm";

describe("Geospatial", () => {
  test("should define an object model, open a realm, and perform geospatial queries", async () => {
    // :snippet-start: define-geopoint-class
    class MyGeoPoint {
      type = "Point";

      constructor(long, lat) {
        this.coordinates = [long, lat];
      }

      static schema = {
        name: "MyGeoPoint",
        embedded: true,
        properties: {
          type: "string",
          coordinates: "double[]",
        },
      };
    }
    // :snippet-end:

    // :snippet-start: use-geopoint-class
    class Company extends Realm.Object {
      static schema = {
        name: "Company",
        properties: {
          _id: "int",
          location: "MyGeoPoint",
        },
        primaryKey: "_id",
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Company, MyGeoPoint.schema],
    });

    expect(realm.isClosed).toBe(false);

    // :snippet-start: write-geospatial-object
    // Add geospatial object to realm.
    realm.write(() => {
      realm.create(Company, {
        _id: 6,
        location: new MyGeoPoint(-122.35, 47.68),
      });
      realm.create(Company, {
        _id: 9,
        location: new MyGeoPoint(-121.85, 47.9),
      });
    });
    // :snippet-end:

    // :snippet-start: geocircle
    const largeCircle = {
      center: [-121.9, 47.3],
      distance: 0.25,
    };

    const circleCenterCoordinates = [-122.6, 47.8];
    const radius = kmToRadians(44.4);

    const smallCircle = {
      center: circleCenterCoordinates,
      distance: radius,
    };
    // :snippet-end:

    // :snippet-start: geobox
    const largeBox = {
      bottomLeft: [-122.7, 47.3],
      topRight: [-122.1, 48.1],
    };

    const smallBox = {
      bottomLeft: [-122.4, 47.5],
      topRight: [-121.8, 47.9],
    };
    // :snippet-end:

    // :snippet-start: geopolygon
    // Create a basic polygon
    const basicPolygon = {
      outerRing: [
        [-122.8, 48.0],
        [-121.8, 48.2],
        [-121.6, 47.6],
        [-122.0, 47.0],
        [-122.6, 47.2],
        [-122.8, 48.0],
      ],
    };

    // Create a polygon with one hole
    const polygonWithOneHole = {
      outerRing: [
        [-122.8, 48.0],
        [-121.8, 48.2],
        [-121.6, 47.6],
        [-122.0, 47.0],
        [-122.6, 47.2],
        [-122.8, 48.0],
      ],
      holes: [
        [
          [-122.6, 47.8],
          [-122.2, 47.7],
          [-122.6, 47.4],
          [-122.5, 47.6],
          [-122.6, 47.8],
        ],
      ],
    };

    const hole2 = [
      [-122.05, 47.55],
      [-121.9, 47.5],
      [-122.1, 47.3],
      [-122.05, 47.55],
    ];

    const polygonWithTwoHoles = {
      outerRing: [
        [-122.8, 48.0],
        [-121.8, 48.2],
        [-121.6, 47.6],
        [-122.0, 47.0],
        [-122.6, 47.2],
        [-122.8, 48.0],
      ],
      holes: [
        [
          [-122.6, 47.8],
          [-122.2, 47.7],
          [-122.6, 47.4],
          [-122.5, 47.6],
          [-122.6, 47.8],
        ],
        hole2,
      ],
    };
    // :snippet-end:

    // :snippet-start: geocircle-query
    const companiesInLargeCircle = realm
      .objects(Company)
      .filtered("location geoWithin $0", largeCircle);
    console.log("Companies in large circle: ${companiesInLargeCircle.length}");

    const companiesInSmallCircle = realm
      .objects(Company)
      .filtered("location geoWithin $0", smallCircle);
    console.log("Companies in small circle: ${companiesInSmallCircle.length}");
    // :snippet-end:
    // :snippet-start: geobox-query
    const companiesInLargeBox = realm
      .objects(Company)
      .filtered("location geoWithin $0", largeBox);
    console.log("Companies in large circle: ${companiesInLargeBox.length}");

    const companiesInSmallBox = realm
      .objects(Company)
      .filtered("location geoWithin $0", smallBox);
    console.log("Companies in small circle: ${companiesInSmallBox.length}");
    // :snippet-end:
    // :snippet-start: geopolygon-query
    const companiesInBasicPolygon = realm
      .objects(Company)
      .filtered("location geoWithin $0", basicPolygon);
    console.log("Companies in large circle: ${companiesInBasicPolygon.length}");

    const companiesInPolygonWithTwoHoles = realm
      .objects(Company)
      .filtered("location geoWithin $0", polygonWithTwoHoles);
    console.log(
      "Companies in small circle: ${companiesInPolygonWithTwoHoles.length}"
    );
    // :snippet-end:

    expect(companiesInLargeCircle.length).toBe(2);
    expect(companiesInSmallCircle.length).toBe(1);
    expect(companiesInLargeBox.length).toBe(1);
    expect(companiesInSmallBox.length).toBe(2);
    expect(companiesInBasicPolygon.length).toBe(2);
    expect(companiesInPolygonWithTwoHoles.length).toBe(1);

    // Clean up after test
    realm.write(() => {
      realm.deleteAll();
    });
    realm.close();
    expect.hasAssertions();
  });
});
