user.logOutAsync(result -> {
    if (result.isSuccess()) {
        Log.v("EXAMPLE", "Successfully removed user from device.");
        expectation.fulfill();
    } else {
        Log.e("EXAMPLE", "Failed to remove user from device: " + result.getError().getErrorMessage());
    }
});