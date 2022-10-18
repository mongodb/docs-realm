let beforeClientResetBlock: (Realm) -> Void = { before in
    var recoveryConfig = Realm.Configuration()
    recoveryConfig.fileURL = myRecoveryPath
    do {
       try before.writeCopy(configuration: recoveryConfig)
        // The copied realm could be used later for recovery, debugging, reporting, etc.
     } catch {
            // handle error
     }
}

let afterClientResetBlock: (Realm, Realm) -> Void = { before, after in
    /// // This block could be used to add custom recovery logic, back-up a realm file, send reporting, etc. For illustration:
    /// for object in before.objects(myClass.self) {
    ///     let res = after.objects(myClass.self)
    ///     if (res.filter("primaryKey == %@", object.primaryKey).first != nil) {
    ///         // ...custom recovery logic...
    ///     } else {
    ///         // ...custom recovery logic...
    ///     }
    /// }
}

do {
    let app = App(id: YOUR_APP_SERVICES_APP_ID)
    let user = try await app.login(credentials: Credentials.anonymous)
    var configuration = user.flexibleSyncConfiguration(clientResetMode:
                                                        .recoverOrDiscardUnsyncedChanges(
                                                            beforeReset: beforeClientResetBlock,
                                                            afterReset: afterClientResetBlock))
} catch {
    print("Error logging in user: \(error.localizedDescription)")
}
