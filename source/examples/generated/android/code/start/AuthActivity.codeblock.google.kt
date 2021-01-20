fun loginWithGoogle() {
    val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestIdToken("YOUR GOOGLE SDK APP ID")
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