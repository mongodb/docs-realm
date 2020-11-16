package com.mongodb.realm.examples.java;

import android.util.Log;

import androidx.test.core.app.ActivityScenario;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
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
            // :code-block-start: anonymous
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(anonymousCredentials, it -> {
                // :hide-start:
                Assert.assertEquals(true, it.isSuccess());
                // :hide-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated anonymously.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :hide-start:
                expectation.fulfill();
                // :hide-end:
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void testEmailPassword() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: email-password
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials emailPasswordCredentials = Credentials.emailPassword("<email>", "<password>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(emailPasswordCredentials, it -> {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess());
                // :hide-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using an email and password.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :hide-start:
                expectation.fulfill();
                // :hide-end:
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void testAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: api-key
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials apiKeyCredentials = Credentials.apiKey("<key>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(apiKeyCredentials, it -> {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess());
                // :hide-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using an API Key.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :hide-start:
                expectation.fulfill();
                // :hide-end:
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void testCustomFunction() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: custom-function
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials customFunctionCredentials =
                    Credentials.customFunction(new org.bson.Document("username", "bob"));

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(customFunctionCredentials, it -> {
                // :hide-start:
                Assert.assertEquals(true, it.isSuccess());
                // :hide-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using a custom function.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :hide-start:
                expectation.fulfill();
                // :hide-end:
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void testCustomJWT() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: custom-jwt
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch JWT from custom provider
            Credentials customJWTCredentials = Credentials.jwt("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(customJWTCredentials, it -> {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess());
                // :hide-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using a custom JWT.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :hide-start:
                expectation.fulfill();
                // :hide-end:
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void testFacebookOAuth() {
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID;
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // :code-block-start: facebook
            // :hide-start:
            FacebookSdk.setApplicationId("960466841104579");
            // :replace-with:
            // FacebookSdk.setApplicationId("YOUR FACEBOOK SDK APP ID");
            // :hide-end:
            FacebookSdk.sdkInitialize(activity);
            CallbackManager callbackManager = CallbackManager.Factory.create();
            LoginManager.getInstance().registerCallback(callbackManager,
                new FacebookCallback<LoginResult>() {
                    @Override
                    public void onSuccess(LoginResult loginResult) {
                        // Signed in successfully, forward credentials to MongoDB Realm.
                        AccessToken accessToken = loginResult.getAccessToken();
                        Credentials facebookCredentials = Credentials.facebook(accessToken.getToken());
                        app.loginAsync(facebookCredentials, it -> {
                            if (it.isSuccess()) {
                                Log.v("AUTH", "Successfully logged in to MongoDB Realm using Facebook OAuth.");
                            } else {
                                Log.e("AUTH", "Failed to log in to MongoDB Realm", it.getError());
                            }
                        });
                    }
                    
                    @Override
                    public void onCancel() {
                        Log.v("AUTH", "Facebook authentication cancelled.");
                    }
                    
                    @Override
                    public void onError(FacebookException exception) {
                        Log.e("AUTH", "Failed to authenticate using Facebook: " + exception.getMessage());
                    }
                }
            );
            LoginManager.getInstance().logIn(activity, null);
            // :code-block-end:
        });
    }

    @Test
    public void testGoogleOAuth() {
        ActivityScenario.launch(AuthActivity.class);
    }

    @Test
    public void testSignInWithApple() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :code-block-start: apple
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch apple token using Apple SDK

            Credentials appleCredentials = Credentials.apple("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(appleCredentials, it -> {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess());
                // :hide-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :hide-start:
                expectation.fulfill();
                // :hide-end:
            });
            // :code-block-end:
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
                    // :code-block-start: log-out
                    user.get().logOutAsync( result -> {
                        // :hide-start:
                        Assert.assertEquals(true, result.isSuccess());
                        // :hide-end:
                        if (result.isSuccess()) {
                            Log.v("AUTH", "Successfully logged out.");
                        } else {
                            Log.e("AUTH", result.getError().toString());
                        }
                        // :hide-start:
                        expectation.fulfill();
                        // :hide-end:
                    });
                    // :code-block-end:
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
            });

        });
        expectation.await();
    }
}
