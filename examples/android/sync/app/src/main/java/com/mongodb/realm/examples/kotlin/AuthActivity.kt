package com.mongodb.realm.examples.kotlin;

import android.R.attr
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.auth.GoogleAuthType


class AuthActivity : AppCompatActivity() {
    lateinit var app: App
    private val RC_SIGN_IN = 9001

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        val appID = YOUR_APP_ID
        app = App(
            AppConfiguration.Builder(appID)
                .build()
        )
        loginWithGoogle()
    }

    // :code-block-start: google
    fun loginWithGoogle() {
        val gso = GoogleSignInOptions
            .Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            // :remove-start:
            .requestIdToken("95080929124-rsqtfko567k2stoh0k7cm84t3tgl3270.apps.googleusercontent.com")
            // :remove-end: :uncomment-start:
            // .requestIdToken("YOUR WEB APPLICATION CLIENT ID FOR GOOGLE AUTH")
            // :uncomment-end:
            .build()
        val googleSignInClient = GoogleSignIn.getClient(this, gso)
        val signInIntent: Intent = googleSignInClient.signInIntent
        // RC_SIGN_IN lets onActivityResult identify the result of THIS call
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent()
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }

    fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            if (completedTask.isSuccessful) {
                val account: GoogleSignInAccount? = completedTask.result
                val token: String = account?.idToken!!
                val googleCredentials: Credentials =
                    Credentials.google(token, GoogleAuthType.ID_TOKEN)
                app.loginAsync(googleCredentials) {
                    if (it.isSuccess) {
                        Log.v(
                            "AUTH",
                            "Successfully logged in to MongoDB Realm using Google OAuth."
                        )
                    } else {
                        Log.e("AUTH",
                            "Failed to log in to MongoDB Realm", it.error)
                    }
                }
            } else {
                Log.e("AUTH", "Google Auth failed: ${completedTask.exception}")
            }

        } catch (e: ApiException) {
            Log.e("AUTH", "Failed to authenticate using Google OAuth: " + e.message);
        }
    }
    // :code-block-end:
}
