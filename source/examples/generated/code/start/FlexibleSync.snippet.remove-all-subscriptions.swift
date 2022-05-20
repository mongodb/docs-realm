let subscriptions = realm.subscriptions
subscriptions.write({
    subscriptions.removeAll()
}, onComplete: { error in // error is optional
    if error == nil {
      // Flexible Sync has updated data to match the subscription
    } else {
      // Handle the error
    }
})
