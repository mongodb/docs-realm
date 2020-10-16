package com.mongodb.realm.examples

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import java.util.concurrent.TimeUnit

class InitializeKotlin : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Realm.init(this) // `this` is a Context, typically an Application or Activity
        accessTheAppClient()
        configuration()
    }

    fun accessTheAppClient() {
        val appID : String = "<your App ID>" // replace this with your App ID
        val app: App = App(AppConfiguration.Builder(appID).build())
    }

    fun configuration() {
        val appID = "<your App ID>" // replace this with your App ID
        val app: App = App(AppConfiguration.Builder(appID)
            .appName("My App")
            .requestTimeout(30, TimeUnit.SECONDS)
            .build())
    }
}