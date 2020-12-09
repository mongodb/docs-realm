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

    fun loginWithGoogle() {
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken("95080929124-rsqtfko567k2stoh0k7cm84t3tgl3270.apps.googleusercontent.com")
            .requestEmail()
            .build()
        val googleSignInClient = GoogleSignIn.getClient(this, gso)
        val account = GoogleSignIn.getLastSignedInAccount(this)
        val signInIntent: Intent = googleSignInClient.signInIntent
        startActivityForResult(signInIntent, RC_SIGN_IN) // RC_SIGN_IN lets onActivityResult identify the result of THIS call
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }

    fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account: GoogleSignInAccount? = completedTask.result
            val authorizationCode: String? = account?.serverAuthCode
            val googleCredentials: Credentials = Credentials.google(authorizationCode, GoogleAuthType.AUTH_CODE)
            app.loginAsync(googleCredentials) {
                if (it.isSuccess) {
                    Log.v(
                        "AUTH",
                        "Successfully logged in to MongoDB Realm using Google OAuth."
                    )
                } else {
                    Log.e("AUTH", "Failed to log in to MongoDB Realm", it.error)
                }
            }
        } catch (e: ApiException) {
            Log.e("AUTH", "Failed to authenticate using Google OAuth: " + e.message);
        }
    }
}
