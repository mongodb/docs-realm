User user = app.currentUser();
user.getApiKeys().fetchAll(result -> {
    if (result.isSuccess()) {
        Log.v("EXAMPLE", "Successfully fetched API keys: " + Arrays.toString(result.get().toArray()));
        expectation.fulfill();
    } else {
        Log.e("EXAMPLE", "Error fetching API keys: " + result.getError().getErrorMessage());
    }
});