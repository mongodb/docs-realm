app.getEmailPassword().registerUserAsync(email, password, it -> {
    if (it.isSuccess()) {
        Log.i("EXAMPLE", "Successfully registered user.");
        expectation.fulfill();
    } else {
        Log.e("EXAMPLE", "Failed to register user: " + it.getError().getErrorMessage());
    }
});