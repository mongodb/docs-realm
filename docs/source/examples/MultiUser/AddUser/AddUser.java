App app = new App(new AppConfiguration.Builder("myapp-abcde").build());

// Log in as Joe
Credentials joeCredentials = Credentials.emailPassword("joe@example.com", "passw0rd");
app.loginAsync(joeCredentials, it -> {
  if (it.isSuccess()) {
    // The active user is now Joe
    User joe = it.get();
    assert joe == app.currentUser();
  } else {
    Log.e(TAG, it.getError().toString());
  }
});

// Log in as Emma
Credentials emmaCredentials = Credentials.emailPassword("emma@example.com", "pa55word");
app.loginAsync(emmaCredentials, it -> {
  if (it.isSuccess()) {
    // The active user is now Emma
    User emma = it.get();
    assert emma == app.currentUser();
  } else {
    Log.e(TAG, it.getError().toString());
  }
});
