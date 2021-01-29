user.linkCredentialsAsync(Credentials.emailPassword(email, password), result -> {
    if (it.isSuccess()) {
        Log.v("EXAMPLE", "Successfully linked existing user identity with email/password user: " + result.get());
    } else {
        Log.e("EXAMPLE", "Failed to link user identities with: " + result.getError());
    }
});
