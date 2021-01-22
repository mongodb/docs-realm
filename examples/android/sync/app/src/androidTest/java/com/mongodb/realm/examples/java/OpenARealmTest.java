package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class OpenARealmTest extends RealmTest {
    @Test
    public void testAllowReadsWritesOnUIThread() {
        Expectation expectation = new Expectation();

        String PARTITION = getRandomPartition();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");
                    // :code-block-start: allow-reads-writes-ui-thread
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
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
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }
}
