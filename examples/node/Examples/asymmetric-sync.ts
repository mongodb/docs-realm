import Realm, { BSON } from "realm";

const app = new Realm.App({ id: "js-flexible-oseso" });

// :snippet-start: asymmetric-sync-object
class WeatherSensor extends Realm.Object<WeatherSensor> {
  _id!: Realm.BSON.ObjectId;
  deviceId!: string;
  temperatureInFahrenheit!: number;
  barometricPressureInHg!: number;
  windSpeedInMph!: number;

  static schema = {
    name: "WeatherSensor",
    // sync WeatherSensor objects one way from your device
    // to your Atlas database.
    asymmetric: true,
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      deviceId: "string",
      temperatureInFahrenheit: "int",
      barometricPressureInHg: "float",
      windSpeedInMph: "float",
    },
  };
}
// :snippet-end:

describe("Asymmetric Sync", () => {
  beforeAll(async () => {
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
  });

  afterAll(async () => {
    app.currentUser?.logOut;
  });

  test("create asymmetric object", async () => {
    if (!app.currentUser) {
      return;
    }

    // :snippet-start: open-realm
    const realm = await Realm.open({
      schema: [WeatherSensor],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    });
    // :snippet-end:

    // :snippet-start: write-asymmetric-object
    realm.write(() => {
      realm.create(WeatherSensor, {
        _id: new BSON.ObjectID(),
        deviceId: "WX1278UIT",
        temperatureInFahrenheit: 66.7,
        barometricPressureInHg: 29.65,
        windSpeedInMph: 2,
      });
    });
    // :snippet-end:

    const weatherSensorCollection = await getWeatherSensors();
    const weatherSensor = await weatherSensorCollection.findOne({
      deviceId: "WX1278UIT",
    });

    expect(weatherSensor?.deviceId).toBe("WX1278UIT");

    // Delete weather sensor documents.
    await weatherSensorCollection.deleteMany({
      deviceId: "WX1278UIT",
    });

    realm.close();

    function getWeatherSensors(): Promise<
      Realm.Services.MongoDB.MongoDBCollection<WeatherSensor>
    > {
      return new Promise((resolve) => {
        // Wait for weather sensor document to sync, then
        // use mongo client to verify it was created.
        setTimeout(() => {
          const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
          const asyncWeatherSensors = mongodb
            .db("JSFlexibleSyncDB")
            .collection<WeatherSensor>("WeatherSensor");

          resolve(asyncWeatherSensors);
        }, 400);
      });
    }
  });
});
