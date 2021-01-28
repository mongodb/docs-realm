let syncSession = syncedRealm.syncSession!
let token = syncSession.addProgressNotification(
    for: .upload, mode: .forCurrentlyOutstandingWork) { (progress) in

    let transferredBytes = progress.transferredBytes
    let transferableBytes = progress.transferrableBytes
    let transferPercent = progress.fractionTransferred * 100

    print("Uploaded \(transferredBytes)B / \(transferableBytes)B (\(transferPercent)%)")
}

// Upload something
try! syncedRealm.write {
    syncedRealm.add(Task())
}
