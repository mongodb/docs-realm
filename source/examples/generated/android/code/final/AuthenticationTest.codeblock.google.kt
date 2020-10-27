private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
    try {
        val account: GoogleSignInAccount = completedTask.getResult(ApiException.class);
        // Signed in successfully, forward credentials to MongoDB Realm.
        val authorizationCode: String = account.getServerAuthCode();
        val googleCredentials: Credentials = Credentials.google(authorizationCode);
        app.loginAsync(googleCredentials) {
            Assert.assertEquals(false, it.isSuccess);
            if (it.isSuccess) {
                Log.v(TAG, "Successfully logged in to MongoDB Realm using Google OAuth.")
            } else {
                Log.e(TAG, "Error logging in: ${it.error.toString()}")
            }
            expectation.fulfill();
        }
    } catch (ApiException e) {
        // The ApiException status code indicates the detailed failure reason.
        // Please refer to the GoogleSignInStatusCodes class reference for more information.
        Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
        updateUI(null);
    }
}