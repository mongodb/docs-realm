package com.mongodb.realm.examples;

import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;

public class AuthenticationJava extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Realm.init(this); // context, usually an Activity or Application
    }

    public void anonymous() {

        String appID = "<your app ID>"; // replace this with your App ID
        App app = new App(new AppConfiguration.Builder(appID)
                .build());

        Credentials anonymousCredentials = Credentials.anonymous();

        AtomicReference<User> user = null;
        app.loginAsync(anonymousCredentials, it -> {
            if (it.isSuccess()) {
                Log.v("AUTH", "Successfully authenticated anonymously.");
                user.set(app.currentUser());
            } else {
                Log.e("AUTH", it.getError().toString());
            }
        });


    }
}
