package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.Random;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.auth.ApiKey;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class UserAPIKeysTest extends RealmTest {
    String email;
    String password;
    ApiKey apiKey;

    @Before
    public void setUpUserAndKey() {
        Random random = new Random();
        email = "test" + random.nextInt(100000);
        password = "testtest";

        Expectation userIsRegistered = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            app.getEmailPassword().registerUserAsync(email, password, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully registered user.");
                    userIsRegistered.fulfill();
                } else {
                    Log.e("EXAMPLE", "Failed to register user: " + it.getError().getErrorMessage());
                }
            });
        });
        userIsRegistered.await();

        Expectation apiKeyIsCreated = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated user.");
                    User user = app.currentUser();
                    user.getApiKeys().createAsync("Name_of_the_API_Key", result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully created API key: " + result.get().getValue());
                            apiKeyIsCreated.fulfill();
                            apiKey = result.get();
                        } else {
                            Log.e("EXAMPLE", "Error creating API key: " + result.getError().getErrorMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        apiKeyIsCreated.await();
    }

    @Test
    public void testCreateAUserAPIKey() {
        Expectation expectation = new Expectation();

        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated user.");
                    User user = app.currentUser();
                    user.getApiKeys().createAsync("Name-of-the-API-Key", result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully created API key: " + result.get().getValue());
                        } else {
                            Log.e("EXAMPLE", "Error creating API key: " + result.getError().getErrorMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testLookUpAUsersAPIKeys() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    user.getApiKeys().fetchAll(result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully fetched API keys: " + Arrays.toString(result.get().toArray()));
                        } else {
                            Log.e("EXAMPLE", "Error fetching API keys: " + result.getError().getErrorMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testLookUpASpecificUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    User user = app.currentUser();
                    user.getApiKeys().fetchAsync(api_key_id, result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully fetched API key: " + result.get());
                        } else {
                            Log.e("EXAMPLE", "Error fetching API key: " + result.getError().getErrorMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testEnableUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    User user = app.currentUser();
                    user.getApiKeys().enableAsync(api_key_id, result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully enabled API key.");
                        } else {
                            Log.e("EXAMPLE", "Error fetching API key: " + result.getError().getErrorMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testDisableUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    User user = app.currentUser();
                    user.getApiKeys().disableAsync(api_key_id, result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully disabled API key.");
                        } else {
                            Log.e("EXAMPLE", "Error disabling API key: " + result.getError().getErrorMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testDeleteUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    User user = app.currentUser();
                    user.getApiKeys().deleteAsync(api_key_id, result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully deleted API key.");
                        } else {
                            Log.e("EXAMPLE", "Error deleting API key: " + result.getError().getErrorMessage());
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
