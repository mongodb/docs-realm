override fun onDestroy() {
    super.onDestroy()
    recyclerView.adapter = null
    // if a user hasn't logged out when the activity exits, still need to explicitly close the realm
    projectRealm.close()
}