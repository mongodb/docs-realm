private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
    try {
        GoogleSignInAccount account = completedTask.getResult(ApiException.class);
        // Signed in successfully, forward credentials to MongoDB Realm.
        String authorizationCode = account.getServerAuthCode();
        Credentials googleCredentials = Credentials.google(authorizationCode);
        app.loginAsync(googleCredentials, it -> {
            if (it.isSuccess()) {
                Log.v("AUTH", "Successfully logged in to MongoDB Realm using Google OAuth.")
            } else {
                Log.e("AUTH", "Failed to log in to MongoDB Realm", it.getError())
            }
        })
    } catch (ApiException e) {
        // The ApiException status code indicates the detailed failure reason.
        // Please refer to the GoogleSignInStatusCodes class reference for more information.
        Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
        updateUI(null);
    }
}