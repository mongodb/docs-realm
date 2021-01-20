package com.mongodb.realm.examples;

import android.app.Application;
import android.util.Log;

import io.realm.Realm;
import io.realm.log.LogLevel;
import io.realm.log.RealmLog;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;

/*
 * TaskTracker: Sets up the taskApp Realm App and enables Realm-specific logging in debug mode.
 */
class CustomApplicationJava extends Application {

    App taskApp;

    @Override
    public void onCreate() {
        super.onCreate();
        Realm.init(this);
        taskApp = new App(
            new AppConfiguration.Builder("android-example-testers-rztwe")
            .build());

        // Enable more logging in debug mode
        if (BuildConfig.DEBUG) {
            RealmLog.setLevel(LogLevel.ALL);
        }

        Log.v("EXAMPLE", "Initialized the Realm App configuration.");
    }
}