package com.mongodb.realm.realmkmmapp

import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import kotlin.test.Test

class RegistrationTest: RealmTest() {
    @Test
    fun emailPasswordRegistrationTest() {
        val email = getRandom()
        val password = getRandom()
        // :code-block-start: email-password-registration
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password)
            // once registered, you can log in with the user credentials
            val user = app.login(Credentials.emailPassword(email, password))
            Log.v("Successfully logged in ${user.identity}")
        }
        // :code-block-end:
    }

}