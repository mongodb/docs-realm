val app: App = new App(new AppConfiguration.Builder("myapp-abcde").build())

// Log in as Joe
val joeCredentials: Credentials = Credentials.emailPassword("joe@example.com", "passw0rd")
app.loginAsync(joeCredentials) {
  if (it.isSuccess()) {
    // The active user is now Joe
    val joe: User = it.get();
    assert joe == app.currentUser();
  } else {
    Log.e(TAG, it.getError().toString());
  }
}

// Log in as Emma
val emmaCredentials: Credentials = Credentials.emailPassword("emma@example.com", "pa55word")
app.loginAsync(emmaCredentials) {
  if (it.isSuccess()) {
    // The active user is now Emma
    val emma: User = it.get();
    assert emma == app.currentUser();
  } else {
    Log.e(TAG, it.getError().toString());
  }
}
