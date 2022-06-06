let subscriptions = realm.subscriptions
try await subscriptions.update {
    if let foundSubscription = subscriptions.first(ofType: Team.self, where: {
           $0.teamName == "Developer Education"
    }) {
        foundSubscription.updateQuery(toType: Team.self, where: {
             $0.teamName == "Documentation"
        })
    }
}
