LoginManager.getInstance().registerCallback(callbackManager,
    FacebookCallback<LoginResult>() {
        @Override
        public void onSuccess(LoginResult loginResult) {
            // Signed in successfully, forward credentials to MongoDB Realm.
            val accessToken = loginResult.getAccessToken();
            val facebookCredentials: Credentials = Credentials.facebook(accessToken);
            app.loginAsync(facebookCredentials) {
                Assert.assertEquals(false, it.isSuccess)
                if (it.isSuccess) {
                    Log.v(TAG, "Successfully logged in to MongoDB Realm using Facebook OAuth.")
                } else {
                    Log.e(TAG, "Failed to log in to MongoDB Realm", it.error)
                }
                expectation.fulfill();
            }
        }
        
        @Override
        public void onCancel() {
              // App code
        }
        
        @Override
        public void onError(FacebookException exception) {
              // App code   
        }
    }
);