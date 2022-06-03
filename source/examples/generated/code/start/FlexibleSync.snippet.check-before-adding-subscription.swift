let subscriptions = realm.subscriptions
if let foundSubscription = subscriptions.first(named: "user_team") {
    subscriptions.update({
        foundSubscription.updateQuery(toType: Team.self, where: {
             $0.teamName == "Developer Education"
        })
    })
} else {
    subscriptions.update({
       subscriptions.append(
          QuerySubscription<Team> {
             $0.teamName == "Developer Education"
          })
    })
}
