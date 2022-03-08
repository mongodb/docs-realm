// need to create a separate instance of realm to issue an update
// since realm instances cannot be shared across threads
val config = SyncConfiguration.Builder(user, partition)
    .build()

// Sync all realm changes via a new instance, and when that instance has been successfully
// created connect it to an on-screen list (a recycler view)
val realm: Realm = Realm.getInstance(config)
// execute Transaction asynchronously to avoid blocking the UI thread
realm.executeTransactionAsync {
    // using our thread-local new realm instance, query for and update the task status
    val item = it.where<Task>().equalTo("id", id).findFirst()
    item?.statusEnum = status
}
// always close realms when you are done with them!
realm.close()
