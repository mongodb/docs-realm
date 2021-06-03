package com.mongodb.tasktracker

import android.app.Application
import android.util.Log
import android.widget.Toast
import androidx.core.content.ContextCompat

import io.realm.Realm
import io.realm.log.LogLevel
import io.realm.log.RealmLog
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration

lateinit var taskApp: App

// global Kotlin extension that resolves to the short version
// of the name of the current class. Used for labelling logs.
inline fun <reified T> T.TAG(): String = T::class.java.simpleName
const val PARTITION_EXTRA_KEY = "PARTITION"
const val PROJECT_NAME_EXTRA_KEY = "PROJECT NAME"

/*
* TaskTracker: Sets up the taskApp Realm App and enables Realm-specific logging in debug mode.
*/
class TaskTracker : Application() {

    override fun onCreate() {
        super.onCreate()
        // Initialize the Realm SDK
        Realm.init(this)
        // :code-block-start: initialize-realm-and-create-app
        taskApp = App(
            AppConfiguration.Builder(BuildConfig.MONGODB_REALM_APP_ID)
                .defaultSyncErrorHandler { session, error ->
                    Log.e(TAG(), "Sync error: ${error.errorMessage}")
                }
            .build())
        // :code-block-end:

        // Enable more logging in debug mode
        if (BuildConfig.DEBUG) {
            RealmLog.setLevel(LogLevel.ALL)
        }

        Log.v(TAG(), "Initialized the Realm App configuration for: ${taskApp.configuration.appId}")
    }
}

