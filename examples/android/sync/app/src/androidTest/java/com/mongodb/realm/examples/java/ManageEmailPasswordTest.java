package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

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
    public void resetAUsersPassword() {
        Random random = new Random();
        String email = "test" + random.nextInt(100000);
        String password = "testtest";

        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {

            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());


            String token = "token-fake";
            String tokenId = "token-id-fake";
            String newPassword = "newFakePassword";

            // :code-block-start: send-reset-password-email
            app.getEmailPassword().sendResetPasswordEmailAsync(email, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully sent the user a reset password link to " + email);
                } else {
                    Log.e("EXAMPLE", "Failed to send the user a reset password link to " + email + ": " + it.getError().getErrorMessage());
                }
            });
            // :code-block-end:

            // :code-block-start: reset-password
            // token and tokenId are query parameters in the confirmation
            // link sent in the password reset email.
            app.getEmailPassword().resetPasswordAsync(token, tokenId, newPassword, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully updated password for user.");
                } else {
                    Log.e("EXAMPLE", "Failed to reset user's password: " + it.getError().getErrorMessage());
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
