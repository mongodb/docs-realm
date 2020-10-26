val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(AppConfiguration.Builder(appID)
    .build())

// fetch authentication code using Google SDK

val googleCredentials: Credentials = Credentials.google("<token>")

var user: User? = null
app.loginAsync(googleCredentials) {
    Assert.assertEquals(false, it.isSuccess)
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated using Google OAuth.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", "Error logging in: ${it.error.toString()}")
    }
    expectation.fulfill()
}