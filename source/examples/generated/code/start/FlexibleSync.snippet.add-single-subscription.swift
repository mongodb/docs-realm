let subscriptions = realm.subscriptions
subscriptions.update({
   subscriptions.append(
      QuerySubscription<Team> {
         $0.teamName == "Developer Education"
      })
}, onComplete: { error in // error is optional
   if error == nil {
      // Flexible Sync has updated data to match the subscription
   } else {
      // Handle the error
   }
})
