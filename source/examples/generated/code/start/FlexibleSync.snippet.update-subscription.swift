let subscriptions = realm.subscriptions
let foundSubscription = subscriptions.first(ofType: Team.self, where: {
      $0.teamName == "Developer Education"
})
subscriptions.update({
    foundSubscription?.updateQuery(toType: Team.self, where: {
         $0.teamName == "Documentation"
    })
}, onComplete: { error in // error is optional
    if error == nil {
      // Flexible Sync has updated data to match the subscription
    } else {
      // Handle the error
    }
})
