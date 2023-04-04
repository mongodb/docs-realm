val syncErrorHandler = object : SyncSession.ErrorHandler {
    override fun onError(session: SyncSession, error: SyncException) {
        Log.e("Error message" + error.message.toString())
    }
}
runBlocking {
    val user = app.login(credentials)
    val config = SyncConfiguration.Builder(user, setOf(Toad::class))
        .initialSubscriptions { realm ->
            add(realm.query<Toad>(), "subscription name")
        }
        .errorHandler(syncErrorHandler) // Specify a sync error handler
        .build()
