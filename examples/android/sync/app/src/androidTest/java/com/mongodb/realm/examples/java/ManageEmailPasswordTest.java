package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.bson.BSONObject;
import org.bson.BsonArray;
import org.junit.Test;

import java.util.Random;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class ManageEmailPasswordTest extends RealmTest {

    @Test
    public void testRegisterANewUserAccount() {
        Random random = new Random();
        String email = "test" + random.nextInt(100000);
        String password = "testtest";

        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {

            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            // :code-block-start: register-a-new-user-account
            app.getEmailPassword().registerUserAsync(email, password, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully registered user.");
                    // :hide-start:
                    expectation.fulfill();
                    // :hide-end:
                } else {
                    Log.e("EXAMPLE", "Failed to register user: " + it.getError().getErrorMessage());
                }
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void confirmANewUsersEmailAddress() {
        Random random = new Random();
        String email = "test" + random.nextInt(100000);
        String password = "testtest";

        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {

            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            String token = "token-fake";
            String tokenId = "token-id-fake";

            // :code-block-start: confirm-a-new-users-email-address
            // token and tokenId are query parameters in the confirmation
            // link sent in the confirmation email.
            app.getEmailPassword().confirmUserAsync(token, tokenId, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully confirmed new user.");
                } else {
                    Log.e("EXAMPLE", "Failed to confirm user: " + it.getError().getErrorMessage());
                    // :hide-start:
                    expectation.fulfill();
                    // :hide-end:
                }
            });
            // :code-block-end:
        });
        expectation.await();
    }

    @Test
    public void runAPasswordResetFunc() {
        Random random = new Random();
        String email = "test" + random.nextInt(100000);
        String password = "testtest";

        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {

            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            String newPassword = "newFakePassword";

            String[] args = {"security answer 1", "security answer 2"};

            // :code-block-start: run-password-reset-func
            app.getEmailPassword().callResetPasswordFunctionAsync(email, newPassword, args, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully reset the password for" + email);
                } else {
                    Log.e("EXAMPLE", "Failed to reset the password for" + email + ": " + it.getError().getErrorMessage());
                    // :hide-start:
                    expectation.fulfill();
                    // :hide-end:
                }
            });
            // :code-block-end:
        });
        expectation.await();
    }



}
