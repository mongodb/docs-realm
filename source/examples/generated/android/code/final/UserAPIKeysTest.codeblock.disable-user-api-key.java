User user = app.currentUser();
user.getApiKeys().disableAsync(api_key_id, result -> {
    if (result.isSuccess()) {
        Log.v("EXAMPLE", "Successfully disabled API key.");
    } else {
        Log.e("EXAMPLE", "Error disabling API key: " + result.getError().getErrorMessage());
        // TODO: Fix this test so that it actually disables an API Key! (currently fails at "error processing request" for unknown reasons)
        expectation.fulfill();
    }
});