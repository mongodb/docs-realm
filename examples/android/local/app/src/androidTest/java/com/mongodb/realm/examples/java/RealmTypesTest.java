package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.BundledRealmModule;

import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.DynamicRealm;
import io.realm.DynamicRealmObject;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;

public class RealmTypesTest extends RealmTest {
    @Test
    public void testReadOnlyRealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: read-only
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .assetFile("bundled.realm")
                    // :hide-start:
                    .name("bundled.realm")
                    // :hide-end:
                    .readOnly() // :emphasize:
                    .modules(new BundledRealmModule())
                    .build();
            // :code-block-end:
            //Realm realm = Realm.getInstance(config);
            //realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testInMemoryRealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: in-memory
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .inMemory() // :emphasize:
                    .name("java.transient.realm")
                    .build();
            Realm realm = Realm.getInstance(config);
            // :code-block-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testDynamicRealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: dynamic
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowWritesOnUiThread(true)
                    .allowQueriesOnUiThread(true)
                    .name("java.dynamic.realm")
                    // :hide-start:
                    .inMemory() // make this example secretly transient so state doesn't save between test runs
                    // :hide-end:
                    .build();
            DynamicRealm dynamicRealm = DynamicRealm.getInstance(config); // :emphasize:

            // all objects in a DynamicRealm are DynamicRealmObjects
            AtomicReference<DynamicRealmObject> frog = new AtomicReference<>();
            dynamicRealm.executeTransaction(transactionDynamicRealm -> {
                // add type Frog to the schema with name and age fields
                dynamicRealm.getSchema()
                        .create("Frog")
                        .addField("name", String.class)
                        .addField("age", int.class);
                 frog.set(transactionDynamicRealm.createObject("Frog"));
                 frog.get().set("name", "Wirt Jr.");
                 frog.get().set("age", 42);
            });

            // access all fields in a DynamicRealm using strings
            String name = frog.get().getString("name");
            int age = frog.get().getInt("age");

            // because an underlying schema still exists,
            // accessing a field that does not exist throws an exception
            try {
                frog.get().getString("doesn't exist");
            } catch (IllegalArgumentException e) {
                Log.e("EXAMPLE", "That field doesn't exist.");
            }

            // Queries still work normally
            RealmResults<DynamicRealmObject> frogs = dynamicRealm.where("Frog")
                    .equalTo("name", "Wirt Jr.")
                    .findAll();
            // :code-block-end:
            dynamicRealm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
