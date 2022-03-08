package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmInstant
import io.realm.RealmList
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.Index
import io.realm.annotations.PrimaryKey
import io.realm.dynamic.DynamicMutableRealm
import io.realm.dynamic.DynamicMutableRealmObject
import io.realm.dynamic.DynamicRealm
import io.realm.dynamic.DynamicRealmObject
import io.realm.internal.platform.runBlocking
import io.realm.migration.AutomaticSchemaMigration
import io.realm.notifications.InitialResults
import io.realm.notifications.ResultsChange
import io.realm.notifications.UpdatedResults
import io.realm.query
import io.realm.query.Sort
import io.realm.realmListOf

import kotlin.test.Test
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.async
import kotlinx.coroutines.launch

// :code-block-start: realm-object-model
class Sample : RealmObject {
    @PrimaryKey
    var stringField: String = "Realm"
    var byteField: Byte = 0xA
    var charField: Char = 'a'
    var shortField: Short = 17
    var intField: Int = 42
    @Index
    var longField: Long = 256L
    var booleanField: Boolean = true
    var floatField: Float = 3.14f
    var doubleField: Double = 1.19840122
    var timestampField: RealmInstant =
        RealmInstant.fromEpochSeconds(
            100,
            1000)
}
// :code-block-end:

// :code-block-start: one-to-one-relationship
class Child : RealmObject {
    var frog: Frog? = null
}
// :code-block-end:

// :code-block-start: one-to-many-relationship
class Kid : RealmObject {
    var frogs: RealmList<Frog> =
        realmListOf()
}
// :code-block-end:

// :code-block-start: schema-types
class Student : RealmObject {
    var notes: RealmList<String> =
        realmListOf()
    var nullableNotes: RealmList<String?> =
        realmListOf()
}
// :code-block-end:

class MigrateFromJavaToKotlinSDKTest: RealmTest() {
    @Test
    fun openARealmTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            // :code-block-start: open-a-realm
            val config = RealmConfiguration
                .with(schema = setOf(Frog::class,
                    Sample::class))
            val realm = Realm.open(config)
            Log.v("Successfully opened realm:" +
                    "${realm.configuration.name}")
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun openARealmBuilderTest() {
        val REALM_NAME = getRandom()
        val PATH = TMP_PATH
        val KEY = ByteArray(64)

        runBlocking {
            // :code-block-start: open-a-realm-advanced
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .deleteRealmIfMigrationNeeded()
                .directory(PATH)
                .encryptionKey(KEY)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm:" +
                    realm.configuration.name
            )
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun asyncWriteTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm:" +
                    realm.configuration.name
            )
            // :code-block-start: write-async
            realm.write {
                // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun syncWriteTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: write-sync
            realm.writeBlocking {
                // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun queryTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: query-filters
            val samples: RealmResults<Sample> =
                realm.query<Sample>().find()

            val samplesThatBeginWithN:
                    RealmResults<Sample> =
                realm.query<Sample>(
                    "stringField BEGINSWITH 'N'"
                ).find()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun querySortLimitDistinctTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: query-sort-limit-distinct
            val aggregates: RealmResults<Sample> =
                realm.query<Sample>()
                    .distinct(Sample::stringField.name)
                    .sort(Sample::stringField.name,
                        Sort.ASCENDING)
                    .limit(2)
                    .find()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun deleteTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.writeBlocking { // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
                sample.stringField = "not sven"
                this.copyToRealm(sample)
            }
            // :code-block-start: deletes
            val sample: Sample? =
                realm.query<Sample>()
                    .first().find()

            // delete one object synchronously
            realm.writeBlocking {
                if (sample != null) {
                    findLatest(sample)
                        ?.also { delete(it) }
                }
            }

            // delete a query result asynchronously
            GlobalScope.launch {
                realm.write {
                    query<Sample>()
                        .first()
                        .find()
                        ?.also { delete(it) }
                }
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun notificationTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.writeBlocking { // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
                sample.stringField = "not sven"
                this.copyToRealm(sample)
            }

            val asyncQuery = async {
                // :code-block-start: notifications
                // in a coroutine or a suspend function
                realm.query<Sample>().asFlow().collect {
                        results: ResultsChange<Sample> ->
                    when (results) {
                        is InitialResults<Sample> -> {
                            // do nothing with the
                            // initial set of results
                        }
                        is UpdatedResults<Sample> -> {
                            // log change description
                            Log.v("Results changed. " +
                                "change ranges: " +
                                results.changeRanges +
                                ", insertion ranges: " +
                                results.insertionRanges +
                                ", deletion ranges: " +
                                results.deletionRanges
                            )
                        }
                    }
                }
                // :code-block-end:
            }
            asyncQuery.cancel()
            realm.close()
        }
    }

    @Test
    fun threadingTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()

            // :code-block-start: threading
            val realm = Realm.open(config)
            // :hide-start:
            realm.writeBlocking { // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
                sample.stringField = "not sven"
                this.copyToRealm(sample)
            }
            // :hide-end:
            val sample: Sample? =
                realm.query<Sample>()
                    .first()
                    .find()

            launch(Dispatchers.Unconfined) {
                // can access the realm opened on
                // a different thread
                realm.query<Sample>().find()
                // can access realm object queried
                // on a different thread
                Log.v(sample!!.stringField)
            }.join()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun migrationTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()

            // :code-block-start: migrations
            // A Realm migration that performs
            // automatic schema migration
            // and allows additional custom
            // migration of data.
            RealmConfiguration.Builder(
                schema = setOf(Sample::class))
                .migration(AutomaticSchemaMigration {
                        context:
                            AutomaticSchemaMigration.MigrationContext ->
                    val oldRealm:
                            DynamicRealm =
                        context.oldRealm
                    val newRealm:
                            DynamicMutableRealm =
                        context.newRealm
                    // dynamic realm gives access
                    // to realm data
                    // through a generic string
                    // based API
                    context.enumerate("Sample") {
                            oldObject:
                                DynamicRealmObject,
                            newObject:
                                DynamicMutableRealmObject? ->
                        newObject?.set("longField",
                                        42L)
                    }
                })
                .build()
            val realm = Realm.open(config)
            // :code-block-end:
            realm.close()
        }
    }
}