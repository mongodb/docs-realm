let subscriptions = realm.subscriptions
try await subscriptions.update {
    subscriptions.append(
        QuerySubscription<Task>(name: "completed-tasks") {
             $0.completed == true
    })
    subscriptions.append(
        QuerySubscription<Team> {
          $0.teamName == "Developer Education"
    })
}
