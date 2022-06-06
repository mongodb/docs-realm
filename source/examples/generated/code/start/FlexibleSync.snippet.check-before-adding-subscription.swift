let subscriptions = realm.subscriptions
let foundSubscription = subscriptions.first(named: "user_team")
try await subscriptions.update {
    if foundSubscription != nil {
        foundSubscription!.updateQuery(toType: Team.self, where: {
             $0.teamName == "Developer Education"
        })
    } else {
        subscriptions.append(
            QuerySubscription<Team>(name: "user_team") {
              $0.teamName == "Developer Education"
           })
    }
}
