let subscriptions = realm.subscriptions
// Look for a specific subscription, and then remove it
let foundSubscription = subscriptions.first(named: "docs-team")
subscriptions.update({
    subscriptions.remove(foundSubscription!)
}, onComplete: { error in // error is optional
    if error == nil {
      // Flexible Sync has updated data to match the subscription
    } else {
      // Handle the error
    }
})

// Or remove a subscription that you know exists without querying for it
subscriptions.update {
    subscriptions.remove(named: "existing-subscription")
}
