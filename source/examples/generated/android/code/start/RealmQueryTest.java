package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.Cat;
import com.mongodb.realm.examples.model.Human;
import com.mongodb.realm.examples.model.Task;

import org.bson.types.ObjectId;
import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class RealmQueryTest extends RealmTest {
    private String PARTITION = "REALMQUERYTEST";
    @Test
    public void testFindObjectByPrimaryKey() {
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


                            realm.executeTransaction( transactionRealm -> {
                                Task task = transactionRealm.where(Task.class).equalTo("_id", PRIMARY_KEY_VALUE.get()).findFirst();
                                Log.v("EXAMPLE", "Fetched object by primary key: " + task);
                            });
                            realm.close();
                        }
                    });
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testQueryARelationship() {
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


                            realm.executeTransaction(transactionRealm -> {
                                Human owner = transactionRealm.where(Human.class).equalTo("cat.name", "bucky").findFirst();
                                Cat cat = owner.getCat();
                                Log.v("EXAMPLE", "Queried for humans with cats named 'bucky'. Found " + owner.getName() + ", who owns " + cat.getName());
                            });
                            realm.close();
                        }
                    });
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testQueryAnInverseRelationship() {
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
                            Log.v("EXAMPLE", "Successfully opened a realm.");


                            realm.executeTransaction(transactionRealm -> {
                                Cat cat = transactionRealm.where(Cat.class).equalTo("owner.name", "steven").findFirst();
                                Human owner = cat.getOwner().first();
                                Log.v("EXAMPLE", "Queried for cats with owners named 'steven'. Found " + cat.getName() + ", owned by " + owner.getName());
                            });
                            realm.close();
                        }
                    });
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }
}

