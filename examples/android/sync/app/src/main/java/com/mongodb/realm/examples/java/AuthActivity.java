package com.mongodb.realm.examples.java;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.auth.GoogleAuthType;

import static com.mongodb.realm.examples.CustomApplicationKt.YOUR_APP_ID;

public class AuthActivity extends AppCompatActivity {
    App app;
    int RC_SIGN_IN = 9001;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String appID = YOUR_APP_ID; // replace this with your App ID
        app = new App(new AppConfiguration.Builder(appID)
                .build());
        signInWithGoogle();
    }

    // :code-block-start: google
    private void signInWithGoogle() {
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                // :hide-start:
                .requestIdToken("95080929124-rsqtfko567k2stoh0k7cm84t3tgl3270.apps.googleusercontent.com")
                // :replace-with:
                // .requestIdToken("YOUR GOOGLE SDK APP ID")
                // :hide-end:
                .requestEmail()
                .build();
        GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(this, gso);
        Intent signInIntent = googleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN); // RC_SIGN_IN lets onActivityResult identify the result of THIS call
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            String authorizationCode = account.getServerAuthCode();
            Credentials googleCredentials = Credentials.google(authorizationCode, GoogleAuthType.AUTH_CODE);
            app.loginAsync(googleCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully logged in to MongoDB Realm using Google OAuth.");
                } else {
                    Log.e("AUTH", "Failed to log in to MongoDB Realm", it.getError());
                }
            });
        } catch (ApiException e) {
            Log.w("AUTH", "Failed to log in with Google OAuth: " + e.getMessage());
        }
    }
    // :code-block-end:
}
