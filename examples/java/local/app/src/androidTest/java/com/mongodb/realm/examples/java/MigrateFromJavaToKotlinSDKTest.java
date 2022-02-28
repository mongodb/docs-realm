package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.exceptions.RealmFileException;

public class MigrateFromJavaToKotlinSDKTest extends RealmTest {
    @Test
    public void testOpenAndCloseARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: open-a-realm
            RealmConfiguration config = new RealmConfiguration.Builder()
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
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
