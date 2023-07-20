// Remove all unnamed (anonymous) subscriptions
realm.subscriptions.update {
    this.removeAll(anonymousOnly = true)
}
