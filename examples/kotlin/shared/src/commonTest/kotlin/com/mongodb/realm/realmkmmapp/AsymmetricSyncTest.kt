package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.annotations.ExperimentalAsymmetricSyncApi
import io.realm.kotlin.mongodb.ext.insert
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.types.AsymmetricRealmObject
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.BsonObjectId
import org.mongodb.kbson.ObjectId
import kotlin.test.Test


// :replace-start: {
//   "terms": {
//     "yourFlexAppId": "YOUR_APP_ID"
//   }
// }
class AsymmetricSyncTest : RealmTest() {

    // :snippet-start: asymmetric-model
    class WeatherSensor : AsymmetricRealmObject {
        @PersistedName("_id")
        @PrimaryKey
        var id: ObjectId = BsonObjectId()
        var deviceId: String = ""
        var temperatureInFarenheit: Float = 0.0F
        var barometricPressureInHg: Float = 0.0F
        var windSpeedInMph: Int = 0
    }
    // :snippet-end:


    @OptIn(ExperimentalAsymmetricSyncApi::class)
    @Test
    fun asymmetricObjectTest() = runBlocking {
        val credentials = Credentials.anonymous()
        // :snippet-start: connect-and-authenticate
        val app = App.create(yourFlexAppId)
        val user = app.login(credentials)
        // :snippet-end:
        // :snippet-start: open-asymmetric-sync-realm
        val config = SyncConfiguration.create(user, setOf(WeatherSensor::class))
        val asymmetricRealm = Realm.open(config)
        Log.v("Successfully opened realm: ${asymmetricRealm.configuration.name}")
        // :snippet-end:

        // :snippet-start: create-asymmetric-object
        asymmetricRealm.write {
            insert(WeatherSensor().apply {
                id = ObjectId()
                deviceId = "WX1278UIT"
                temperatureInFarenheit = 6.7F
                barometricPressureInHg = 29.65F
                windSpeedInMph = 2
            })
        }
        // :snippet-end:
        // Add a delay to give the document time to sync
//        asymmetricRealm.syncSession.run {
//            resume()
//            uploadAllLocalChanges(30.seconds)
//        }
        // Verify the document was added, and then delete it for cleanup.
        //val weatherSensor = getWeatherSensors(app, "WX1278UIT")
        // weatherSensor.deleteMany(WeatherSensor::deviceId, "WX1278UIT")
        // assertEquals(0, weatherSensor.count())
    }

//    suspend fun getWeatherSensors(app: App, weatherSensorPrimaryKey: String): WeatherSensor? {
//        val mongoClient = app.currentUser?.mongoClient("mongodb-atlas")
//        val mongoDatabase = mongoClient?.getDatabase("kotlin")
//        val weatherSensorCollection = mongoDatabase?.getCollection<WeatherSensor>("WeatherSensor")
//        // Query the MongoDB collection for the document with the given primary key
//        val weatherSensor = weatherSensorCollection?.findOne(WeatherSensor::deviceId, "WX1278UIT")
//
//        return weatherSensor
//    }


}
// :replace-end: