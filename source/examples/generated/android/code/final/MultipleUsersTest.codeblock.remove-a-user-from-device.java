app.loginAsync(credentials, it -> {
    if (it.isSuccess()) {
        User user = it.get();
        app.removeUser(user);
        expectation.fulfill();
    } else {
        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
    }
});