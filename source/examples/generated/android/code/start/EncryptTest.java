package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import org.junit.Test;

import java.security.SecureRandom;
import java.util.Random;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class EncryptTest extends RealmTest {

    @Test
    public void encrypt() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            Random random = new Random();
            String PARTITION = "encrypted_" + random.nextInt(10000);
            App app = new App(new AppConfiguration.Builder(appID).build());
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    // Generate a key
                    byte[] key = new byte[64];
                    new SecureRandom().nextBytes(key);
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .encryptionKey(key)
                            .build();
                    // Open the encrypted realm
                    Realm realm = Realm.getInstance(config);
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
