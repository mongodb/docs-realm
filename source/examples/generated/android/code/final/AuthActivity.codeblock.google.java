private void signInWithGoogle() {
    GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken("95080929124-rsqtfko567k2stoh0k7cm84t3tgl3270.apps.googleusercontent.com")
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