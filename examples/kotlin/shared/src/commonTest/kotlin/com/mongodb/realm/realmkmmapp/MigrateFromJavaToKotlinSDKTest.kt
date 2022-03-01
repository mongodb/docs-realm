package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmInstant
import io.realm.RealmList
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.Index
import io.realm.annotations.PrimaryKey
import io.realm.delete
import io.realm.internal.platform.runBlocking
import io.realm.notifications.InitialResults
import io.realm.notifications.ResultsChange
import io.realm.notifications.UpdatedResults
import io.realm.query
import io.realm.query.Sort
import io.realm.realmListOf

import kotlin.test.Test
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
    var frogs: RealmList<Frog> = realmListOf()
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
        val PATH = randomTmpRealmPath()
        val KEY = ByteArray(64)

        runBlocking {
            // :code-block-start: open-a-realm-advanced
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .deleteRealmIfMigrationNeeded()
                .path(PATH)
                .encryptionKey(KEY)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun asyncWriteTest() {
        val REALM_NAME = getRandom()
        val PATH = randomTmpRealmPath()
        val KEY = ByteArray(64)

        runBlocking {

            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .path(PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: write-async
            realm.write { // this: MutableRealm
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
        val PATH = randomTmpRealmPath()
        val KEY = ByteArray(64)

        runBlocking {

            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .path(PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: write-sync
            realm.writeBlocking { // this: MutableRealm
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
        val PATH = randomTmpRealmPath()
        val KEY = ByteArray(64)

        runBlocking {

            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .path(PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: query-filters
            val samples: RealmResults<Sample> =
                realm.query<Sample>().find()

            val samplesThatBeginWithN: RealmResults<Sample> =
                realm.query<Sample>("stringField BEGINSWITH 'N'").find()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun queryAggregatesTest() {
        val REALM_NAME = getRandom()
        val PATH = randomTmpRealmPath()
        val KEY = ByteArray(64)

        runBlocking {

            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .path(PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: query-aggregates
            val aggregates: RealmResults<Sample> =
                realm.query<Sample>()
                    .distinct(Sample::stringField.name)
                    .sort(Sample::stringField.name, Sort.ASCENDING)
                    .limit(2)
                    .find()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun deleteTest() {
        val REALM_NAME = getRandom()
        val PATH = randomTmpRealmPath()
        val KEY = ByteArray(64)

        runBlocking {

            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .path(PATH)
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
                val liveSample: Sample? =
                    this.findLatest(sample!!)
                liveSample?.delete()
            }

            // delete a query result asynchronously
            GlobalScope.launch {
                realm.write {
                    query<Sample>()
                        .first()
                        .find()
                        .also { delete(it!!) }
                }
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun notificationTest() {
        val REALM_NAME = getRandom()
        val PATH = randomTmpRealmPath()
        val KEY = ByteArray(64)

        runBlocking {

            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .path(PATH)
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
                realm.query<Sample>()
                    .asFlow().collect { results: ResultsChange<Sample> ->
                        when (results) {
                            is InitialResults<Sample> -> {
                                // do nothing with the initial set of results
                            }
                            is UpdatedResults<Sample> -> {
                                // log change description
                                Log.v(
                                    "Results changed. " +
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
}