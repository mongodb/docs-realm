let subscriptions = realm.subscriptions
subscriptions.write({
    subscriptions.append(
        QuerySubscription<Task>(name: "completed-tasks") {
             $0.completed == true
    })
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
