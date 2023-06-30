package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.exceptions.CompensatingWriteException
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.sync.SyncSession
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals

// :replace-start: {
//    "terms": {
//       "SyncItem": "Item"
//    }
// }

class SyncedRealmCRUD : RealmTest() {
    // :snippet-start: flexible-sync-crud-model
    class SyncItem : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var ownerId: String = ""
        var itemName: String = ""
        var complexity: Int = 0
    }
    // :snippet-end:

    @Test
    fun subscriptionSetupTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            // :snippet-start: flexible-sync-subscription-setup
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                // Add subscription
                .initialSubscriptions { realm ->
                    add(
                        // Get Items from Atlas that match the Realm Query Language query.
                        // Uses the queryable field `complexity`.
                        // Query matches objects with complexity less than or equal to 4.
                        realm.query<SyncItem>("complexity <= 4"),
                        "simple-items"
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
            // where the `Item.ownerId` property matches their own user ID.
            val userId = user.id
            val newItem = SyncItem().apply {
                _id = oid // :remove:
                ownerId = userId
                itemName = "Learn Realm CRUD operations"
                complexity = 3
            }

            syncRealm.write {
                // `newItem` is successfully written to the realm and synced to Atlas
                // because its data matches the subscription query (complexity <= 4)
                // and its `ownerId` field matches the user ID.
                this.copyToRealm(newItem)
            }
            // :snippet-end:
            val addedItem: RealmResults<SyncItem> = syncRealm.query<SyncItem>().find()
            assertEquals(1, addedItem.size)
            assertEquals(oid, addedItem[0]._id)
            syncRealm.write {
                val deleteItem: RealmResults<SyncItem> = this.query<SyncItem>().find()
                delete(deleteItem)
            }
            user.delete()
            syncRealm.close()
        }
    }

    @Test
    fun compensatingWriteTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)

        val channel = Channel<CompensatingWriteException>(1)
        // :snippet-start: access-compensating-write
        val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
            runBlocking {
                if (error is CompensatingWriteException) {
                    channel.send(error)
                    val writeInfo = error.writes[0]
                    val errorMessage = """
                        A write was rejected with a compensating write error
                        The write to object type: ${writeInfo.objectType}
                        With primary key of: ${writeInfo.primaryKey}
                        Was rejected because: ${writeInfo.reason}
                    """.trimIndent()
                    Log.e(errorMessage)
                }
            }
        }
        // :snippet-end:
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                .initialSubscriptions { realm -> add(realm.query<SyncItem>("complexity <= 4"), "simple-items") }
                .errorHandler(syncErrorHandler)
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            syncRealm.write {
                SyncItem().apply {
                    ownerId = user.id
                    itemName = "This is a compensating write error handling test"
                    complexity = 7

            }}
            delay(1000)
            val exception: CompensatingWriteException = channel.receiveOrFail()
            assertEquals("[Session][CompensatingWrite(231)] Client attempted a write that is disallowed by permissions, or modifies an object outside the current query, and the server undid the change.", exception.message)
            assertEquals(1, exception.writes.size)
            channel.close()
            user.delete()
            syncRealm.close()
        }
    }

    @Test
    fun compensatingWriteQueryTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                .initialSubscriptions { realm -> add(realm.query<SyncItem>("complexity <= 4"), "simple-items") }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            // :snippet-start: write-outside-flexible-sync-query
            // The complexity of this item is `7`. This is outside the bounds
            // of the subscription query, which triggers a compensating write.
            val itemTooComplex = SyncItem().apply {
                ownerId = user.id
                itemName = "This item is too complex"
                complexity = 7
            }
            try {
                syncRealm.write {
                    this.copyToRealm(itemTooComplex)
                }
            } catch (exception: Exception) {
                Log.e("Failed to write to realm: ${exception.message}")
            }
            // :snippet-end:
            delay(1000)
            user.delete()
            syncRealm.close()
        }
    }

    @Test
    fun compensatingWritePermissionTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        val channel = Channel<CompensatingWriteException>(1)
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                .initialSubscriptions { realm -> add(realm.query<SyncItem>("complexity <= 4"), "simple-items") }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            // :snippet-start: write-outside-permissions
            // The `ownerId` of this item does not match the `user.id` of the logged-in
            // user. The user does not have permissions to make this write, so
            // it triggers a compensating write.
            val itemWithWrongOwner = SyncItem().apply {
                ownerId = "not the current user"
                itemName = "A simple item"
                complexity = 1
            }
            try {
                syncRealm.write {
                    this.copyToRealm(itemWithWrongOwner)
                }
            } catch (exception: Exception) {
                Log.e("Failed to write to realm: ${exception.message}")
            }
            // :snippet-end:
//            delay(1000)
            val exception: CompensatingWriteException = channel.receiveOrFail()
            assertEquals("[Session][CompensatingWrite(231)] Client attempted a write that is disallowed by permissions, or modifies an object outside the current query, and the server undid the change.", exception.message)
            assertEquals(1, exception.writes.size)
            channel.close()
            syncRealm.close()
        }
    }
}

// :replace-end: