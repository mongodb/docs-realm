package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.Sample;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Test;

import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import io.realm.DynamicRealm;
import io.realm.DynamicRealmObject;
import io.realm.OrderedCollectionChangeSet;
import io.realm.OrderedRealmCollectionChangeListener;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmMigration;
import io.realm.RealmObjectSchema;
import io.realm.RealmResults;
import io.realm.RealmSchema;
import io.realm.Sort;
import io.realm.exceptions.RealmFileException;

public class MigrateFromJavaToKotlinSDKTest extends RealmTest {
    @Test
    public void testOpenARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: open-a-realm
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                    .build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            // :code-block-end:
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testAsyncWrite() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                            .name(getRandom())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                // :code-block-start: write-async
                realm.executeTransactionAsync(
                        transactionRealm -> {
                    Sample sample = new Sample();
                    sample.stringField = "Sven";
                    transactionRealm.copyToRealm(sample);
                });
                // :code-block-end:
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testSyncWrite() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                            .name(getRandom())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                // :code-block-start: write-sync
                realm.executeTransaction(
                        transactionRealm -> {
                    Sample sample = new Sample();
                    sample.stringField = "Sven";
                    transactionRealm.copyToRealm(sample);
                });
                // :code-block-end:
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testQuery() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                            .name(getRandom())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                // :code-block-start: query-filters
                RealmResults<Sample> samples =
                        realm.where(Sample.class).findAll();

                RealmResults<Sample> samplesThatBeginWithN =
                        realm.where(Sample.class)
                                .beginsWith("stringField",
                                        "N").findAll();
                // :code-block-end:
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testQueryAggregates() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                            .name(getRandom())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                // :code-block-start: query-aggregates
                RealmResults<Sample> aggregates =
                        realm.where(Sample.class)
                        .distinct("stringField")
                        .sort("stringField",
                                Sort.ASCENDING)
                        .limit(2)
                        .findAll();
                // :code-block-end:
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testDeletes() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                            .name(getRandom())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                realm.executeTransaction(transactionRealm -> {
                    Sample sample = new Sample();
                    sample.stringField = "Sven";
                    transactionRealm.copyToRealm(sample);
                    sample.stringField = "not sven";
                    transactionRealm.copyToRealm(sample);
                });
                // :code-block-start: deletes
                Sample sample =
                        realm.where(Sample.class)
                                .findFirst();

                // delete one object synchronously
                realm.executeTransaction(transactionRealm ->
                        sample.deleteFromRealm());

                // delete a query result asynchronously
                realm.executeTransactionAsync(backgroundRealm ->
                        backgroundRealm.where(Sample.class)
                                .findFirst().deleteFromRealm());
                // :code-block-end:
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testNotifications() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                            .name(getRandom())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        Sample sample = new Sample();
                        sample.stringField = "Sven";
                        realm.copyToRealm(sample);
                        sample.stringField = "not sven";
                        realm.copyToRealm(sample);
                    }
                });
                // :code-block-start: notifications
                realm.where(Sample.class).findAllAsync()
                    .addChangeListener(
                            (samples, changeSet) -> {
                        // log change description
                        Log.v("EXAMPLE",
                            "Results changed. " +
                            "change ranges: " +
                            Arrays.toString(
                                changeSet.getChangeRanges()) +
                            ", insertion ranges: " +
                            Arrays.toString(
                                changeSet.getInsertionRanges()) +
                            ", deletion ranges: " +
                            Arrays.toString(
                                changeSet.getDeletionRanges()));
                    });
                // :code-block-end:
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testThreading() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config =
                    new RealmConfiguration.Builder()
                            .name(getRandom())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

            Realm realm;
            try {
                // :code-block-start: threading
                realm = Realm.getInstance(config);
                // :hide-start:
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        Sample sample = new Sample();
                        sample.stringField = "Sven";
                        realm.copyToRealm(sample);
                        sample.stringField = "not sven";
                        realm.copyToRealm(sample);
                    }
                });
                // :hide-end:
                Sample sample = realm.where(Sample.class).findFirst();
                // save sample field in a separate variable
                // for access on another thread
                String sampleStringField = sample.stringField;
                ExecutorService executorService = Executors.newFixedThreadPool(4);
                executorService.execute(new Runnable() {
                    @Override
                    public void run() {
                        // cannot pass a realm into another thread,
                        // so get a new instance for separate thread
                        Realm realm = Realm.getInstance(config);
                        // cannot access original sample on another
                        // thread, so use sampleStringField instead
                        Sample threadSample = realm.where(Sample.class)
                                .equalTo("stringField",
                                        sampleStringField).findFirst();
                        Log.v("EXAMPLE",
                                "Fetched sample on separate thread: " +
                                        threadSample);
                    }
                });
                // :code-block-end:
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            realm = Realm.getInstance(config);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testMigration() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: migrations
            RealmConfiguration config =
                new RealmConfiguration.Builder()
                        .migration((realm,
                                    oldVersion,
                                    newVersion) -> {
                    RealmSchema schema =
                            realm.getSchema();

                    if (oldVersion == 0L) {
                        // perform schema migration
                        schema.get("Sample")
                            .addField("new_field",
                                    String.class);
                    }

                    // migrate data
                    schema.get("Sample")
                        .transform(obj ->
                            obj.set("longField",
                                    42L));
                }).build();

            Realm realm;
            try {
                realm = Realm.getInstance(config);
                Log.v("EXAMPLE",
                        "Successfully opened a realm: "
                                + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE",
                        "Error opening the realm.");
                Log.v("EXAMPLE",
                        ex.toString());
            }
            // :code-block-end:
            expectation.fulfill();
        });
        expectation.await();
    }
}
