package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.annotations.ExperimentalRealmSerializerApi
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.annotations.ExperimentalAsymmetricSyncApi
import io.realm.kotlin.mongodb.ext.call
import io.realm.kotlin.mongodb.ext.insert
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.types.AsymmetricRealmObject
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.time.Duration.Companion.seconds


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
        var id: ObjectId = ObjectId()
        var deviceId: String = ""
        var temperatureInFarenheit: Float = 0.0F
        var barometricPressureInHg: Float = 0.0F
        var windSpeedInMph: Int = 0
    }
    // :snippet-end:


    @OptIn(ExperimentalAsymmetricSyncApi::class, ExperimentalRealmSerializerApi::class)
    @Test
    fun asymmetricObjectTest() = runBlocking {
        val credentials = Credentials.anonymous(reuseExisting = false)
        // :snippet-start: connect-and-authenticate
        val app = App.create(yourFlexAppId)
        val user = app.login(credentials)
        // :snippet-end:
        // :snippet-start: open-asymmetric-sync-realm
        val config = SyncConfiguration.create(user, setOf(WeatherSensor::class))
        val realm = Realm.open(config)
        Log.v("Successfully opened realm: ${realm.configuration.name}")
        // :snippet-end:

        val oid = ObjectId()
        // :snippet-start: create-asymmetric-object
        realm.write {
            insert(WeatherSensor().apply {
                id = oid //:remove:
                deviceId = "WX1278UIT"
                temperatureInFarenheit = 6.7F
                barometricPressureInHg = 29.65F
                windSpeedInMph = 2
            })
        }
        // :snippet-end:
        // Add a delay to give the document time to sync
        realm.syncSession.run {
            resume()
            uploadAllLocalChanges(30.seconds)
        }
        // Check that the asymmetric data was inserted, then delete by ID
        // Because we don't have MongoClient, we have to use a function
        val deletedCount = user.functions
            .call<Int>("deleteAsymmetricSyncData") {
                add(oid)
            }
        assertEquals(1, deletedCount)
        realm.close()
    }
}
// :replace-end: