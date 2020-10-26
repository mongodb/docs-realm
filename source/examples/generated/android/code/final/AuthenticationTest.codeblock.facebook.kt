val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(
    AppConfiguration.Builder(appID)
        .build()
)

// fetch access token using Facebook SDK

val facebookCredentials: Credentials = Credentials.facebook("<token>")

var user: User? = null
app.loginAsync(facebookCredentials) {
    Assert.assertEquals(false, it.isSuccess)
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated using Facebook OAuth.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", "Error logging in: ${it.error.toString()}")
    }
    expectation.fulfill()
}