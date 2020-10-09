// configure realm to use the current user and the partition corresponding to the user's project
val config = SyncConfiguration.Builder(user!!, "user=${user!!.id}")
    .build()

// Sync all realm changes via a new instance, and when that instance has been successfully created connect it to an on-screen list (a recycler view)
Realm.getInstanceAsync(config, object: Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        // since this realm should live exactly as long as this activity, assign the realm to a member variable
        this@ProjectActivity.userRealm = realm
        setUpRecyclerView(realm)
    }
})