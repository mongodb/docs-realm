package com.mongodb.realm.examples

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User

class AuthenticationKotlin : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Realm.init(this) // context, usually an Activity or Application
        anonymous()
    }

    fun anonymous() {
        val appID = "<your app ID>" // replace this with your App ID
        val app: App = App(
            AppConfiguration.Builder(appID)
            .build())

        val anonymousCredentials: Credentials = Credentials.anonymous()

        var user: User?
        app.loginAsync(anonymousCredentials) {
            if (it.isSuccess) {
                Log.v("AUTH", "Successfully authenticated anonymously.")
                user = app.currentUser()
            } else {
                Log.e("AUTH", it.error.toString())
            }
        }
    }

}