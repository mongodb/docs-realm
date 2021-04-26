func closeRealmSafely() {
    // invalidate all realms
}

func saveBackupRealmPath(_ path: String) {
    // restore the local changes from the backup file at the given path
}

let app = App(id: YOUR_REALM_APP_ID)
app.syncManager.errorHandler = { error, session in
    let syncError = error as! SyncError
    switch syncError.code {
    case .clientResetError:
        if let (path, clientResetToken) = syncError.clientResetInfo() {
            closeRealmSafely()
            saveBackupRealmPath(path)
            SyncSession.immediatelyHandleError(clientResetToken, syncManager: app.syncManager)
        }
    default:
        // Handle other errors...
        ()
    }
}
