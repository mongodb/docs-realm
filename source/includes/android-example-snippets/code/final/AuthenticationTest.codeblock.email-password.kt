val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(
    AppConfiguration.Builder(appID)
        .build()
)

val emailPasswordCredentials: Credentials = Credentials.emailPassword("<email>", "<password>")

var user: User? = null
app.loginAsync(emailPasswordCredentials) {
    Assert.assertEquals(false, it.isSuccess)
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated using an email and password.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", it.error.toString())
    }
    expectation.fulfill()
}