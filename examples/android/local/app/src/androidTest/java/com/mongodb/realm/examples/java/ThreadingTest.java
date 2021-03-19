package com.mongodb.realm.examples.java;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Test;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;

public class ThreadingTest extends RealmTest {
    @Test
    public void testRefreshRealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .inMemory()
                    .name("refresh-realm")
                    .build();
            Realm realm = Realm.getInstance(config);
            // :code-block-start: refresh-realm
            if (!realm.isAutoRefresh()) {
                // manually refresh
                realm.refresh();
            }
            // :code-block-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testFreezeObjects() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .inMemory()
                    .name("freeze-object")
                    .build();
            Realm insertRealm = Realm.getInstance(config);
            insertRealm.executeTransaction(transactionRealm -> {
                insertRealm.createObject(Frog.class);
            });

            // :code-block-start: freeze-objects
            Realm realm = Realm.getInstance(config);

            // Get an immutable copy of the realm that can be passed across threads
            Realm frozenRealm = realm.freeze();
            assert(frozenRealm.isFrozen());

            RealmResults<Frog> frogs = realm.where(Frog.class).findAll();
            // You can freeze collections
            RealmResults<Frog> frozenFrogs = frogs.freeze();
            assert(frozenFrogs.isFrozen());

            // You can still read from frozen realms
            RealmResults<Frog> frozenFrogs2 = frozenRealm.where(Frog.class).findAll();
            assert(frozenFrogs2.isFrozen());

            Frog frog = frogs.first();
            assert(!frog.getRealm().isFrozen());

            // You can freeze objects
            Frog frozenFrog = frog.freeze();
            assert(frozenFrog.isFrozen());
            // Frozen objects have a reference to a frozen realm
            assert(frozenFrog.getRealm().isFrozen());
            // :code-block-end:
            expectation.fulfill();
            realm.close();
        });
        expectation.await();
    }
}
