let subscriptions = realm.subscriptions
// Look for a specific subscription, and then remove it
let foundSubscription = subscriptions.first(named: "docs-team")
try await subscriptions.update {
    subscriptions.remove(foundSubscription!)
}
// Or remove a subscription that you know exists without querying for it
try await subscriptions.update {
    subscriptions.remove(named: "existing-subscription")
}
