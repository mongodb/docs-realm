val stream = realm.syncSession.progressAsFlow(
    Direction.UPLOAD, ProgressMode.CURRENT_CHANGES
)
stream.collect { progress ->
    if (progress.transferableBytes == progress.transferredBytes) {
        println("Upload complete")
    }
}

// Upload data
realm.write {
    this.copyToRealm(Task().apply {
        taskName = "Schedule appointment"
        assignee = "Jane"
        progressMinutes = 0
    })
}
