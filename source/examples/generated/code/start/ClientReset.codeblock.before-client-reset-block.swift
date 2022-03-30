let beforeClientResetBlock: (Realm) -> Void = { beforeRealm in
    /* This block could be used to back-up a realm file, send reporting, etc. */
    // For example, you might copy the realm to a specific path
    // to perform recovery after the client reset is complete.
    let outputDir = try! FileManager.default.url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
    // Append a file name to complete the path
    let myRecoveryPath = outputDir.appendingPathComponent("backup.realm")
    var recoveryConfig = Realm.Configuration()
    recoveryConfig.fileURL = myRecoveryPath

    // Check to see if there is already a realm at the recovery file path. If there
    // is already a realm there, delete it.
    if Realm.fileExists(for: recoveryConfig) {
        do {
            try Realm.deleteFiles(for: recoveryConfig)
            print("Successfully deleted existing realm at path: \(myRecoveryPath)")
        } catch {
            print("Error deleting realm: \(error.localizedDescription)")
        }
    } else {
        print("No file currently exists at path")
    }

    // Try to copy the realm to the specified path.
    do {
        try beforeRealm.writeCopy(configuration: recoveryConfig)
    } catch {
        print("Error copying realm: \(error.localizedDescription)")
    }
}
