package com.mongodb.realm.examples.java;

import android.util.Log;
import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import io.realm.OrderedRealmCollectionSnapshot;
import io.realm.RealmResults;
import io.realm.Realm;
import io.realm.RealmConfiguration;

public class WritesTest extends RealmTest {
    @Test
    public void testCreateObjectFromJSON() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .inMemory()
                    .name("create-object-from-json")
                    .build();
            Realm realm = Realm.getInstance(config);
            try {
                // :code-block-start: create-an-object-json
                // Insert from a string
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        realm.createObjectFromJson(Frog.class,
                                "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\" }");
                    }
                });

                // Insert multiple items using an InputStream
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        try {
                            InputStream inputStream = new FileInputStream(
                                    new File("path_to_file"));
                            realm.createAllFromJson(Frog.class, inputStream);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                });
                // :code-block-end:
            } catch (Exception e) { // this should throw when "path_to_file" doesn't resolve to a real file
                expectation.fulfill();
            }
            realm.close();
        });
        expectation.await();
    }
                              
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
