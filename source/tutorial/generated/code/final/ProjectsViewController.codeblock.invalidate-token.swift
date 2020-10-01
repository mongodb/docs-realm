deinit {
    // Always invalidate any notification tokens when you are done with them.
    notificationToken?.invalidate()
}