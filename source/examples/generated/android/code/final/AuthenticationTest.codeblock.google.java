String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());

// fetch google token using Google SDK

Credentials googleCredentials = Credentials.google("<token>");

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(googleCredentials, it -> {
    Assert.assertEquals(false, it.isSuccess());
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated using Google OAuth.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
    expectation.fulfill();
});