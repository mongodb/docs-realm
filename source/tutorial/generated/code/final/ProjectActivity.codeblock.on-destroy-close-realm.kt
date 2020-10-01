override fun onDestroy() {
    super.onDestroy()
    userRealm?.close()
    recyclerView.adapter = null
}