.. code-block:: java

   private void signInWithGoogle() {
       GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
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
           if (completedTask.isSuccessful()) {
               GoogleSignInAccount account = completedTask.getResult(ApiException.class);
               String token = account.getIdToken();
               Credentials googleCredentials = Credentials.google(token, GoogleAuthType.ID_TOKEN);
               app.loginAsync(googleCredentials, it -> {
                   if (it.isSuccess()) {
                       Log.v("AUTH", "Successfully logged in to MongoDB Realm using Google OAuth.");
                   } else {
                       Log.e("AUTH", "Failed to log in to MongoDB Realm: ", it.getError());
                   }
               });
           } else {
               Log.e("AUTH", "Google Auth failed: " + completedTask.getException().toString());
           }
       } catch (ApiException e) {
           Log.w("AUTH", "Failed to log in with Google OAuth: " + e.getMessage());
       }
   }
