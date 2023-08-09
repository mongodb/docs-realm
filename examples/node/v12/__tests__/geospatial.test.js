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
    const circle1 = {
      center: [-121.9, 47.3],
      distance: 0.25,
    };

    const circle2Center = {
      longitude: -122.6,
      latitude: 47.8,
    };

    // `kmToRadians` is imported from Realm
    const radius = kmToRadians(44.4);

    const circle2 = {
      center: circle2Center,
      distance: radius,
    };
    // :snippet-end:

    // :snippet-start: geobox
    const largeBox = {
      bottomLeft: [-122.7, 47.3],
      topRight: [-122.1, 48.1],
    };

    const smallBoxBottomLeft = {
      longitude: -122.4,
      latitude: 47.5,
    };
    const smallBoxTopRight = {
      longitude: -121.8,
      latitude: 47.9,
    };
    const smallBox = {
      bottomLeft: smallBoxBottomLeft,
      topRight: smallBoxTopRight,
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
    const outerRing = [
      [-122.8, 48.0],
      [-121.8, 48.2],
      [-121.6, 47.6],
      [-122.0, 47.0],
      [-122.6, 47.2],
      [-122.8, 48.0],
    ];

    const hole = [
      [-122.6, 47.8],
      [-122.2, 47.7],
      [-122.6, 47.4],
      [-122.5, 47.6],
      [-122.6, 47.8],
    ];

    const polygonWithOneHole = {
      outerRing: outerRing,
      holes: [hole],
    };

    // Add a second hole to the polygon
    const hole2 = [
      {
        longitude: -122.05,
        latitude: 47.55,
      },
      {
        longitude: -121.9,
        latitude: 47.55,
      },
      {
        longitude: -122.1,
        latitude: 47.3,
      },
      {
        longitude: -122.05,
        latitude: 47.55,
      },
    ];

    const polygonWithTwoHoles = {
      outerRing: outerRing,
      holes: [hole, hole2],
    };
    // :snippet-end:

    // :snippet-start: geocircle-query
    const companiesInCircle1 = realm
      .objects(Company)
      .filtered("location geoWithin $0", circle1);
    console.debug(`Companies in circle1: ${companiesInCircle1.length}`);

    const companiesInCircle2 = realm
      .objects(Company)
      .filtered("location geoWithin $0", circle2);
    console.debug(`Companies in circle2: ${companiesInCircle2.length}`);
    // :snippet-end:
    // :snippet-start: geobox-query
    const companiesInLargeBox = realm
      .objects(Company)
      .filtered("location geoWithin $0", largeBox);
    console.debug(`Companies in large box: ${companiesInLargeBox.length}`);

    const companiesInSmallBox = realm
      .objects(Company)
      .filtered("location geoWithin $0", smallBox);
    console.debug(`Companies in small box: ${companiesInSmallBox.length}`);
    // :snippet-end:
    // :snippet-start: geopolygon-query
    const companiesInBasicPolygon = realm
      .objects(Company)
      .filtered("location geoWithin $0", basicPolygon);
    console.debug(
      `Companies in basic polygon: ${companiesInBasicPolygon.length}`
    );

    const companiesInPolygonWithTwoHoles = realm
      .objects(Company)
      .filtered("location geoWithin $0", polygonWithTwoHoles);
    console.debug(
      `Companies in polygon with two holes: ${companiesInPolygonWithTwoHoles.length}`
    );
    // :snippet-end:

    expect(companiesInCircle1.length).toBe(2);
    expect(companiesInCircle2.length).toBe(1);
    expect(companiesInLargeBox.length).toBe(1);
    expect(companiesInSmallBox.length).toBe(2);
    expect(companiesInBasicPolygon.length).toBe(2);
    expect(companiesInPolygonWithTwoHoles.length).toBe(1);
    expect.hasAssertions();
  });
});
