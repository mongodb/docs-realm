package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.Dog;

import org.bson.types.ObjectId;
import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class SyncDataTest extends RealmTest {
    @Test
    public void openASyncedRealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                realm.createObject(Dog.class, new ObjectId());
                            });
                            // :code-block-start: update-an-object
                            realm.executeTransaction(r -> {
                                // Get all dogs named "Pierogi".
                                RealmResults<Dog> dogs = realm.where(Dog.class).equalTo("name", "Pierogi").findAll();

                                //dogs.setName("Wolfie");
                                // :hide-start:
                                expectation.fulfill();
                                // :hide-end:
                            });
                            // :code-block-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
