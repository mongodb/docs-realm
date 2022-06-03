package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import kotlin.test.Test

class RegistrationTest: RealmTest() {
    @Test
    fun emailPasswordRegistrationTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: email-password-registration
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password)
            // once registered, you can log in with the user credentials
            val user = app.login(Credentials.emailPassword(email, password))
            Log.v("Successfully logged in ${user.identity}")
        }
        // :snippet-end:
    }

}