package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.exceptions.RealmFileException;

public class OpenARealmTest extends RealmTest {
    @Test
    public void testOpenAndCloseARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: open-a-realm-local
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();
            
            Realm realm;
            try {
                realm = Realm.getInstance(config);
                Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE", "Error opening the realm.");
                Log.v("EXAMPLE", ex.toString());
            }
            // :code-block-end:
            realm = Realm.getInstance(config);
            // :code-block-start: close-a-realm-local
            realm.close();
            // :code-block-end:
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void configureARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: configure-a-realm-local
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("alternate-realm")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .compactOnLaunch()
                    .inMemory()
                    .build();

            Realm realm = Realm.getInstance(config);
            Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.getPath());
            // :code-block-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }


    @Test
    public void setAndUseDefaultRealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: set-default-realm
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("default-realm")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .compactOnLaunch()
                    .inMemory()
                    .build();
            // set this config as the default realm
            Realm.setDefaultConfiguration(config); // :emphasize:
            // :code-block-end:

            // :code-block-start: use-default-realm
            Realm realm = Realm.getDefaultInstance();
            Log.v("EXAMPLE","Successfully opened the default realm at: " + realm.getPath());
            // :code-block-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
