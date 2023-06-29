package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.runBlocking
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals

class SyncedRealmCRUD : RealmTest() {
    // :snippet-start: flexible-sync-crud-model
    class Car : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var ownerId: String = ""
        var make: String = ""
        var model: String = ""
        var miles: Int = 0
    }
    // :snippet-end:

    @Test
    fun subscriptionSetupTest() {
        val credentials = Credentials.anonymous()
        runBlocking {
            // :snippet-start: flexible-sync-subscription-setup
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(Car::class))
                // Add subscription
                .initialSubscriptions { realm ->
                    add(
                        // Get Cars from Atlas that match the Realm Query Language query.
                        // Uses the queryable field `miles`.
                        // Query matches cars with less than 100 miles or `null` miles.
                        realm.query<Car>(
                            "miles < 100 OR miles == \$0", null
                        ),
                        "new-car-subscription"
                    )
                }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            // :snippet-end:
            val oid = ObjectId()
            // :snippet-start: successful-write
            // Per the Device Sync permissions, users can only read and write data
            // where the `Car.ownerId` property matches their own user ID.
            val userId = user.id
            val newCar = Car().apply {
                _id = oid // :remove:
                ownerId = userId
                make = "Toyota"
                model = "Corolla"
                miles = 2
            }

            syncRealm.write {
                // `newCar` is successfully written to the realm and synced to Atlas
                // because its data matches the subscription query (miles < 100)
                // and its `ownerId` field matches the user ID.
                this.copyToRealm(newCar)
            }
            // :snippet-end:
            val addedCar: RealmResults<Car> = syncRealm.query<Car>().find()
            assertEquals(1, addedCar.size)
            assertEquals(oid, addedCar[0]._id)
            syncRealm.write {
                val deleteCar: RealmResults<Car> = this.query<Car>().find()
                delete(deleteCar)
            }
        }
    }

}