override fun onStop() {
    super.onStop()
    user.run {
        userRealm?.close()
    }
}