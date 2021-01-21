user.logOutAsync { result ->
    if (result.isSuccess) {
        Log.v("EXAMPLE", "Successfully removed user from device.")
    } else {
        Log.e("EXAMPLE", "Failed to remove user from device: ${result.error.errorMessage}")
    }
}