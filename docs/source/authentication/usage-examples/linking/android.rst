.. code-block:: java

  // Called when an anonymous user decides to create an account with username and password.
  private void linkWithNewUserPasswordUser(String username, String password) {
    // Get the currently logged-in (anonymous) user from Stitch.
    final StitchAuth auth = Stitch.getDefaultAppClient().getAuth();
    final StitchUser user = auth.getUser();

    // Create and link a new identity with the given username and password.
    user.linkWithCredential(new UserPasswordCredential(username, password))
      .addOnCompleteListener(new OnCompleteListener<StitchUser>() {
        @Override
        public void onComplete(@NonNull Task<StitchUser> task) {
          // User is now linked
        }
      });
  }