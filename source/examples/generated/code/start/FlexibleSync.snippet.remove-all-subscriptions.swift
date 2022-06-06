let subscriptions = realm.subscriptions
try await subscriptions.update {
    subscriptions.removeAll()
}
