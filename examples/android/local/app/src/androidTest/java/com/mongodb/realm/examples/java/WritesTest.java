package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Test;

import io.realm.OrderedRealmCollectionSnapshot;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;

public class WritesTest extends RealmTest {
    @Test
    public void testIterate() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("writes-test-iterate")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .inMemory()
                    .build();
            Realm realm = Realm.getInstance(config);
            // :code-block-start: iterate
            RealmResults<Frog> frogs = realm.where(Frog.class)
                    .equalTo("species", "bullfrog")
                    .findAll();

            // Use an iterator to rename the species of all bullfrogs
            realm.executeTransaction(r -> {
                for (Frog frog : frogs) {
                    frog.setSpecies("Lithobates catesbeiana");
                }
            });

            // Use a snapshot to rename the species of all bullfrogs
            realm.executeTransaction(r -> {
                OrderedRealmCollectionSnapshot<Frog> frogsSnapshot = frogs.createSnapshot();
                for (int i = 0; i < frogsSnapshot.size(); i++) {
                    frogsSnapshot.get(i).setSpecies("Lithobates catesbeiana");
                }
            });

            // :code-block-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
