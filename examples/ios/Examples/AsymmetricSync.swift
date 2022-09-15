// :replace-start: {
//   "terms": {
//     "AsymmetricSync_": ""
//   }
// }

import XCTest
import RealmSwift

// :snippet-start: asymmetric-model
class AsymmetricSync_WeatherSensor: AsymmetricObject {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var deviceId: String
    @Persisted var temperatureInFahrenheit: Float
    @Persisted var barometricPressureInHg: Float
    @Persisted var windSpeedInMph: Int
    
    convenience init(deviceId: String, temperatureInFahrenheit: Float, barometricPressureInHg: Float, windSpeedInMph: Int) {
        self.init()
        self.deviceId = deviceId
        self.temperatureInFahrenheit = temperatureInFahrenheit
        self.barometricPressureInHg = barometricPressureInHg
        self.windSpeedInMph = windSpeedInMph
    }
    // :remove-start:
    override class func shouldIncludeInDefaultSchema() -> Bool {
        return false
    }
    // :remove-end:
}
// :snippet-end:

class AsymmetricSync: XCTestCase {    
    @MainActor
    func testAsymmetricSync() async {
        let app = App(id: FLEX_SYNC_APP_ID)
        do {
            let user = try await login()
            await openSyncedRealm(user: user)
        } catch {
            print("Error logging in: \(error.localizedDescription)")
        }

        func login() async throws -> User {
            let user = try await app.login(credentials: Credentials.anonymous)
            return user
        }

        func openSyncedRealm(user: User) async {
            do {
                var asymmetricConfig = user.flexibleSyncConfiguration()
                asymmetricConfig.objectTypes = [AsymmetricSync_WeatherSensor.self]
                let asymmetricRealm = try await Realm(configuration: asymmetricConfig, downloadBeforeOpen: .always)
                await useRealm(asymmetricRealm, user)
            } catch {
                print("Error opening realm: \(error.localizedDescription)")
            }
        }
        func useRealm(_ asymmetricRealm: Realm, _ user: User) async {
            // :snippet-start: create-asymmetric-object
            try! asymmetricRealm.write {
                asymmetricRealm.create(AsymmetricSync_WeatherSensor.self,
                                       value: [ "_id": ObjectId.generate(),
                                                "deviceId": "WX1278UIT",
                                                "temperatureInFahrenheit": 66.7,
                                                "barometricPressureInHg": 29.65,
                                                "windSpeedInMph": 2
                                                ])
            }
            // :snippet-end:
            // Add a delay to give the document time to sync
            sleep(10)
            // Verify the document was added, and then delete it for cleanup.
            let client = app.currentUser!.mongoClient("mongodb-atlas")
            let database = client.database(named: "ios-flexible")
            let collection = database.collection(withName: "AsymmetricSync_WeatherSensor")
            let weatherSensorDocument: Document = ["deviceId": "WX1278UIT"]
            do {
                let foundWeatherSensorDocuments = try await collection.find(filter: weatherSensorDocument)
                print("Found these matching documents: \(foundWeatherSensorDocuments)")
                XCTAssertNotNil(foundWeatherSensorDocuments)
                let deletedResult = try await collection.deleteManyDocuments(filter: weatherSensorDocument)
                print("Deleted documents: \(deletedResult)")
            } catch {
                print("Error finding or deleting documents: \(error.localizedDescription)")
            }
        }
    }
}
// :replace-end:
