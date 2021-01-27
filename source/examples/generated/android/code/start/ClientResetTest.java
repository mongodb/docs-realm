package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.sync.ClientResetRequiredError;
import io.realm.mongodb.sync.SyncSession;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class ClientResetTest extends RealmTest {

    @Test
    public void clientReset() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            SyncSession.ClientResetHandler handler = new SyncSession.ClientResetHandler() {
                @Override
                public void onClientReset(SyncSession session, ClientResetRequiredError error) {
                    Log.e("EXAMPLE", "Client Reset required for: " +
                            session.getConfiguration().getServerUrl() + " for error: " +
                            error.toString());
                }
            };
            App app = new App(new AppConfiguration.Builder(appID)
                    .defaultClientResetHandler(handler)
                    .build());
            expectation.fulfill();  // TODO: trigger a client reset and test this code!
        });
        expectation.await();
    }
}