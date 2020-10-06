override fun onStop() {
    super.onStop()
    user.run {
        projectRealm.close()
    }
}