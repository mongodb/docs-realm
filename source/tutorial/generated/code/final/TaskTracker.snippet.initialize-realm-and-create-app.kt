taskApp = App(
    AppConfiguration.Builder(BuildConfig.MONGODB_REALM_APP_ID)
        .defaultSyncErrorHandler { session, error ->
            Log.e(TAG(), "Sync error: ${error.errorMessage}")
        }
    .build())
