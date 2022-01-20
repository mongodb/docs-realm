package com.mongodb.realm.examples.java;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Test;

import java.util.concurrent.TimeUnit;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.MutableSubscriptionSet;
import io.realm.mongodb.sync.Subscription;
import io.realm.mongodb.sync.SubscriptionSet;
import io.realm.mongodb.sync.SyncConfiguration;

public class FlexibleSyncTest extends RealmTest {

    String YOUR_APP_ID = "android-flexible-rxwsf"; // App ID for flexible sync project, since flexible sync and partition-sync cannot coexist

    @Test
    public void openARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // :code-block-start: open-a-realm
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    // add an initial subscription to the sync configuration
                    // :code-block-start: add-a-subscription
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    subscriptions.add(Subscription.create("subscriptionName",
                                            realm.where(Frog.class) // :emphasize:
                                                .equalTo("species", "spring peeper"))); // :emphasize:
                                }
                            })
                            .build();

                    // instantiate a realm instance with the flexible sync configuration
                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        }
                    });
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void explicitlyNamedSubscription() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    // :code-block-start: explicitly-named-subscription
                                    subscriptions.add(Subscription.create("frogSubscription",
                                            realm.where(Frog.class) // :emphasize:
                                                .equalTo("species", "spring peeper"))); // :emphasize:

                                    // later, you can look up this subscription by name
                                    Subscription subscription = subscriptions.find("frogSubscription");
                                    // :code-block-end:
                                }
                            })
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }


    @Test
    public void implicitlyNamedSubscription() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    // :code-block-start: implicitly-named-subscription
                                    subscriptions.add(Subscription.create(null,
                                            realm.where(Frog.class) // :emphasize:
                                                    .equalTo("species", "spring peeper"))); // :emphasize:

                                    // later, you can look up this subscription by query
                                    Subscription subscription = subscriptions.find(realm.where(Frog.class)
                                        .equalTo("species", "spring peeper"));
                                    // :code-block-end:
                                }
                            })
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void waitForSubscriptionSync() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    // :code-block-start: wait-for-subscription-sync
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    subscriptions.add(Subscription.create("mySubscription",
                                            realm.where(Frog.class) // :emphasize:
                                                    .equalTo("species", "poison dart"))); // :emphasize:
                                }
                            })
                            .waitForInitialRemoteData(2112, TimeUnit.MILLISECONDS)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        }
                    });
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void updateNamedSubscription() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    subscriptions.add(Subscription.create("mySubscription",
                                            realm.where(Frog.class)
                                                    .equalTo("species", "treefrog")));
                                    subscriptions.add(Subscription.create(null,
                                            realm.where(Frog.class)
                                                    .equalTo("species", "cane toad")));
                                }
                            })
                            .waitForInitialRemoteData(2112, TimeUnit.MILLISECONDS)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                            // :code-block-start: update-subscriptions-by-name
                            realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
                                @Override
                                public void update(MutableSubscriptionSet subscriptions) {
                                    // to update a named subscription, create a replacement with
                                    // the same name and add it to the subscription set
                                    subscriptions.addOrUpdate(
                                            Subscription.create("mySubscription",
                                                    realm.where(Frog.class)
                                                        .equalTo("name",
                                                                "Benedict Cumberburger")));
                                }
                            });
                            // :code-block-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }


    @Test
    public void updateUnnamedSubscription() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    subscriptions.add(Subscription.create("mySubscription",
                                            realm.where(Frog.class)
                                                    .equalTo("species", "treefrog")));
                                    subscriptions.add(Subscription.create(null,
                                            realm.where(Frog.class)
                                                    .equalTo("species", "cane toad")));
                                }
                            })
                            .waitForInitialRemoteData(2112, TimeUnit.MILLISECONDS)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                            // :code-block-start: update-subscriptions-by-query
                            realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
                                @Override
                                public void update(MutableSubscriptionSet subscriptions) {
                                    // to update an unnamed subscription, remove it from the
                                    // subscription set, then add your new query to the set
                                    Subscription mySubscription = subscriptions.find(realm.where(Frog.class)
                                            .equalTo("species",
                                                    "cane toad"));
                                    subscriptions.remove(mySubscription);

                                    subscriptions.addOrUpdate(
                                            Subscription.create("mySubscription",
                                                    realm.where(Frog.class)
                                                            .equalTo("name",
                                                                    "Benedict Cumberburger")));
                                }
                            });
                            // :code-block-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void removeSingleSubscription() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    subscriptions.add(Subscription.create("mySubscription",
                                            realm.where(Frog.class)
                                                    .equalTo("species", "treefrog")));
                                }
                            })
                            .waitForInitialRemoteData(2112, TimeUnit.MILLISECONDS)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                            // :code-block-start: remove-single-subscription
                            realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
                                @Override
                                public void update(MutableSubscriptionSet subscriptions) {
                                    Subscription mySubscription = subscriptions.find("mySubscription");
                                    subscriptions.remove(mySubscription);
                                }
                            });
                            // :code-block-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void removeAllSubscriptionsToAnObjectType() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    subscriptions.add(Subscription.create("mySubscription",
                                            realm.where(Frog.class)
                                                    .equalTo("species", "treefrog")));
                                }
                            })
                            .waitForInitialRemoteData(2112, TimeUnit.MILLISECONDS)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                            // :code-block-start: remove-all-subscriptions-to-an-object-type
                            realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
                                @Override
                                public void update(MutableSubscriptionSet subscriptions) {
                                    subscriptions.removeAll(Frog.class);
                                }
                            });
                            // :code-block-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void removeAllSubscriptions() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // instantiate a Realm App connection
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                            .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                                @Override
                                public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                                    subscriptions.add(Subscription.create("mySubscription",
                                            realm.where(Frog.class)
                                                    .equalTo("species", "treefrog")));
                                }
                            })
                            .waitForInitialRemoteData(2112, TimeUnit.MILLISECONDS)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                            // :code-block-start: remove-all-subscriptions
                            realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
                                @Override
                                public void update(MutableSubscriptionSet subscriptions) {
                                    subscriptions.removeAll();
                                }
                            });
                            // :code-block-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
