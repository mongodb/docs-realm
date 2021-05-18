app.emailPassword.callResetPasswordFunctionAsync(email, newPassword, args) {
    if (it.isSuccess) {
        Log.i("EXAMPLE", "Successfully reset the password for $email")
    } else {
        Log.e("EXAMPLE", "Failed to reset the password for $email: $it.error")
    }
}
