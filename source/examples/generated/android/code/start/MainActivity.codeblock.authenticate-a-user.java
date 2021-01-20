Credentials credentials = Credentials.anonymous();

app.loginAsync(credentials, result -> {
    if (result.isSuccess()) {
        Log.v("QUICKSTART", "Successfully authenticated anonymously.");
        User user = app.currentUser();
        // interact with realm using your user object here
    } else {
        Log.e("QUICKSTART", "Failed to log in. Error: " + result.getError());
    }
});