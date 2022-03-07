val appID: String = YOUR_APP_ID // replace this with your App ID
val handler =
    ClientResetHandler { session, error ->
        Log.e("EXAMPLE", "Client Reset required for: ${session.configuration.serverUrl} for error: $error")
    }
val app = App(
    AppConfiguration.Builder(appID)
        .defaultClientResetHandler(handler)
        .build()
)
