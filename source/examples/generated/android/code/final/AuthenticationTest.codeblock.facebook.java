String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());

// fetch facebook token using Facebook SDK

Credentials facebookCredentials = Credentials.facebook("<token>");

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(facebookCredentials, it -> {
    Assert.assertEquals(false, it.isSuccess());
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated using Facebook OAuth.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
    expectation.fulfill();
});