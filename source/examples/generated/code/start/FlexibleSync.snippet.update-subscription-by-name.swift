let subscriptions = realm.subscriptions
let foundSubscription = subscriptions.first(named: "user-team")
try await subscriptions.update {
    foundSubscription?.updateQuery(toType: Team.self, where: {
         $0.teamName == "Documentation"
    })
}
