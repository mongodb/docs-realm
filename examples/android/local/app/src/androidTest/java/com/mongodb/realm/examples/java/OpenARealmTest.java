package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class OpenARealmTest extends RealmTest {
    @Test
    public void testOpenARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: open-a-realm-local
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(Realm realm) {
                    Log.v(
                            "EXAMPLE",
                            "Successfully opened a realm with reads and writes allowed on the UI thread."
                    );
                    // :hide-start:
                    expectation.fulfill();
                    // :hide-end:
                }
            });
            // :code-block-end:
        });
        expectation.await();
    }
}
