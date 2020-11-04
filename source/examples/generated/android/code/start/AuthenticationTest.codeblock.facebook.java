LoginManager.getInstance().registerCallback(callbackManager,
    new FacebookCallback<LoginResult>() {
        @Override
        public void onSuccess(LoginResult loginResult) {
            // Signed in successfully, forward credentials to MongoDB Realm.
            val accessToken = loginResult.getAccessToken();
            val facebookCredentials: Credentials = Credentials.facebook(accessToken);
            app.loginAsync(facebookCredentials, it -> {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully logged in to MongoDB Realm using Facebook OAuth.")
                } else {
                    Log.e("AUTH", "Failed to log in to MongoDB Realm", it.getError())
                }
            })
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