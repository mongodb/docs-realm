package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.Sample;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Test;

import java.util.Arrays;

import io.realm.OrderedCollectionChangeSet;
import io.realm.OrderedRealmCollectionChangeListener;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;
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
                realm.executeTransactionAsync(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        Sample sample = new Sample();
                        sample.stringField = "Sven";
                        realm.copyToRealm(sample);
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
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        Sample sample = new Sample();
                        sample.stringField = "Sven";
                        realm.copyToRealm(sample);
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
                        .sort("stringField", Sort.ASCENDING)
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
                // :code-block-start: deletes
                Sample sample = realm.where(Sample.class).findFirst();

                // delete one object synchronously
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm transactionRealm) {
                        sample.deleteFromRealm();
                    }
                });

                // delete a query result asynchronously
                realm.executeTransactionAsync(new Realm.Transaction() {
                    @Override
                    public void execute(Realm backgroundRealm) {
                        backgroundRealm.where(Sample.class).findFirst().deleteFromRealm();
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
                        .addChangeListener((samples, changeSet) -> {
                            // log change description
                            Log.v("EXAMPLE", "Results changed. " +
                                    "change ranges: " +
                                    Arrays.toString(changeSet.getChangeRanges()) +
                                    ", insertion ranges: " +
                                    Arrays.toString(changeSet.getInsertionRanges()) +
                                    ", deletion ranges: " +
                                    Arrays.toString(changeSet.getDeletionRanges()));
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
}
