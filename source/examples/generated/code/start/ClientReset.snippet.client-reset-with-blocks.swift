let beforeClientResetBlock: (Realm) -> Void = { before in
    // This block could be used to back-up a realm file, send reporting, etc.
}

let afterClientResetBlock: (Realm, Realm) -> Void = { before, after in
    // This block could be used to add custom recovery logic, send reporting, etc.
}

do {
    let app = App(id: YOUR_APP_SERVICES_APP_ID)
    let user = try await app.login(credentials: Credentials.anonymous)
    var configuration = user.flexibleSyncConfiguration(clientResetMode: .recoverOrDiscardUnsyncedChanges(beforeReset: beforeClientResetBlock, afterReset: afterClientResetBlock))
} catch {
    print("Error logging in user: \(error.localizedDescription)")
}
