app.loginAsync(credentials, it -> {
    if (it.isSuccess()) {
        User user = it.get();
        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                app.removeUser(user);
            }
        });
        expectation.fulfill();
    } else {
        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
    }
});