let subscriptions = realm.subscriptions
try await subscriptions.update {
   subscriptions.append(
      QuerySubscription<Team> {
         $0.teamName == "Developer Education"
      })
}
