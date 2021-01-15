package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import org.junit.Test
import java.util.*

class ManageEmailPasswordTest : RealmTest() {
    @Test
    fun testRegisterANewUserAccount() {
        val random = Random()
        val email = "test" + random.nextInt(100000)
        val password = "testtest"
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            // :code-block-start: register-a-new-user-account
            app.emailPassword.registerUserAsync(email, password) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE","Successfully registered user.")
                    // :hide-start:
                    expectation.fulfill()
                    // :hide-end:
                } else {
                    Log.e("EXAMPLE","Failed to register user: ${it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun confirmANewUsersEmailAddress() {
        val random = Random()
        val email = "test" + random.nextInt(100000)
        val password = "testtest"
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val token = "token-fake"
            val tokenId = "token-id-fake"

            // :code-block-start: confirm-a-new-users-email-address
            // token and tokenId are query parameters in the confirmation
            // link sent in the confirmation email.
            app.emailPassword.confirmUserAsync(token, tokenId) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully confirmed new user.")
                } else {
                    Log.e("EXAMPLE", "Failed to register user: ${it.error}")
                    // :hide-start:
                    expectation.fulfill()
                    // :hide-end:
                }
            }
        }
        expectation.await()
    }

    @Test
    fun resetAUsersPassword() {
        val random = Random()
        val email = "test" + random.nextInt(100000)
        val password = "testtest"
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val token = "token-fake"
            val tokenId = "token-id-fake"
            val newPassword = "newFakePassword"

            // :code-block-start: send-reset-password-email
            app.emailPassword.sendResetPasswordEmailAsync(email) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully sent the user a reset password link to $email")
                } else {
                    Log.e("EXAMPLE", "Failed to send the user a reset password link to $email: $it.error")
                }
            }
            // :code-block-end:

            // :code-block-start: reset-password
            // token and tokenId are query parameters in the confirmation
            // link sent in the password reset email.
            app.emailPassword.resetPasswordAsync(token, tokenId, newPassword) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully updated password for user.")
                } else {
                    Log.e("EXAMPLE", "Failed to reset user's password: $it.error")
                    // :hide-start:
                    expectation.fulfill()
                    // :hide-end:
                }
            }
            // :code-block-end:
        }
        expectation.await()
    }
}