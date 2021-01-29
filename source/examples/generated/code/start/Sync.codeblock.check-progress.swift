let syncSession = syncedRealm.syncSession!
let token = syncSession.addProgressNotification(
    for: .upload, mode: .forCurrentlyOutstandingWork) { (progress) in

    let transferredBytes = progress.transferredBytes
    let transferrableBytes = progress.transferrableBytes
    let transferPercent = progress.fractionTransferred * 100

    print("Uploaded \(transferredBytes)B / \(transferrableBytes)B (\(transferPercent)%)")
}

// Upload something
try! syncedRealm.write {
    syncedRealm.add(Task())
}
