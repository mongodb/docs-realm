package com.mongodb.realm.examples;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import java.util.concurrent.TimeUnit;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;

public class InitializeJava extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Realm.init(this); // `this` is a Context, typically an Application or Activity

        accessTheAppClient();
        configuration();
    }

    public void accessTheAppClient() {
        String appID = "<your App ID>"; // replace this with your App ID
        App app = new App(new AppConfiguration.Builder(appID).build());
    }

    public void configuration() {
        String appID = "<your App ID>"; // replace this with your App ID
        Realm.init(this); // `this` is a Context, typically an Application or Activity
        App app = new App(new AppConfiguration.Builder(appID)
                .appName("My App")
                .requestTimeout(30, TimeUnit.SECONDS)
                .build());
    }
}
