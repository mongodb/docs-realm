val changeListener = OrderedRealmCollectionChangeListener<RealmResults<User>> { results, changeSet ->
    Log.i(TAG(), "User object initialized, displaying project list.")
    setUpRecyclerView(realm)
}
syncedUsers.addChangeListener(changeListener)