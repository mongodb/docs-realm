let app = App(id: YOUR_REALM_APP_ID)
app.syncManager.errorHandler = { error, session in
    // handle error
}
