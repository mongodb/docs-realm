user.get().logOutAsync( result -> {
    Assert.assertEquals(true, result.isSuccess());
    if (result.isSuccess()) {
        Log.v("AUTH", "Successfully logged out.");
    } else {
        Log.e("AUTH", result.getError().toString());
    }
    expectation.fulfill();
});