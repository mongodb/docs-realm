val app: App = App(AppConfiguration.Builder("<your app ID>").build())

// Log in as Joe
val joeCredentials: Credentials = Credentials.emailPassword("joe@example.com", "passw0rd")
app.loginAsync(joeCredentials) {
  if (it.isSuccess) {
    val joe: User = it.get()
    if (app.currentUser().email == joe.email) {
      Log.v(TAG,"Current user is joe")
    } else {
      Log.e(TAG, "Current user is not joe")
    }
  } else {
    Log.e(TAG, it.error));
  }
}

// Log in as Emma
val emmaCredentials: Credentials = Credentials.emailPassword("emma@example.com", "pa55word")
app.loginAsync(emmaCredentials) {
  if (it.isSuccess) {
    val emma: User = it.get()
    if (app.currentUser().email == emma.email) {
      Log.v(TAG,"Current user is emma")
    } else {
      Log.e(TAG, "Current user is not emma")
    }
  } else {
    Log.e(TAG, it.error);
  }
}
