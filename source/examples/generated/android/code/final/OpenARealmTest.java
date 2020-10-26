package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.PARTITION;
import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class OpenARealmTest extends RealmTest {
    @Test
    public void testAllowReadsWritesOnUIThread() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");
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
                            expectation.fulfill();
                        }
                    });
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
            //expectation.await();//TODO: FIGURE OUT WHY THIS IS BROKEN
        });
    }
}
