package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class AuthenticationTest extends RealmTest {
    @Test
    public void testAnonymous() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(anonymousCredentials, it -> {
                Assert.assertEquals(true, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated anonymously.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testEmailPassword() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials emailPasswordCredentials = Credentials.emailPassword("<email>", "<password>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(emailPasswordCredentials, it -> {
                Assert.assertEquals(false, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using an email and password.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials apiKeyCredentials = Credentials.apiKey("<key>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(apiKeyCredentials, it -> {
                Assert.assertEquals(false, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using an API Key.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testCustomFunction() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials customFunctionCredentials =
                    Credentials.customFunction(new org.bson.Document("username", "bob"));

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(customFunctionCredentials, it -> {
                Assert.assertEquals(true, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using a custom function.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testCustomJWT() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch JWT from custom provider
            Credentials customJWTCredentials = Credentials.jwt("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(customJWTCredentials, it -> {
                Assert.assertEquals(false, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using a custom JWT.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testFacebookOAuth() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch facebook token using Facebook SDK

            Credentials facebookCredentials = Credentials.facebook("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(facebookCredentials, it -> {
                Assert.assertEquals(false, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using Facebook OAuth.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testGoogleOAuth() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch google token using Google SDK

            Credentials googleCredentials = Credentials.google("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(googleCredentials, it -> {
                Assert.assertEquals(false, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using Google OAuth.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testSignInWithApple() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch apple token using Apple SDK

            Credentials appleCredentials = Credentials.apple("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(appleCredentials, it -> {
                Assert.assertEquals(false, it.isSuccess());
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testLogOut() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            AtomicReference<User> user = new AtomicReference<User>();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated anonymously.");
                    user.set(app.currentUser());
                    user.get().logOutAsync( result -> {
                        Assert.assertEquals(true, result.isSuccess());
                        if (result.isSuccess()) {
                            Log.v("AUTH", "Successfully logged out.");
                        } else {
                            Log.e("AUTH", result.getError().toString());
                        }
                        expectation.fulfill();
                    });
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
            });

        });
        expectation.await();
    }
}