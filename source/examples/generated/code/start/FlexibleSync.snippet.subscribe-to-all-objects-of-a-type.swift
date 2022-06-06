let subscriptions = realm.subscriptions
try await subscriptions.update {
    subscriptions.append(QuerySubscription<Team>(name: "all_teams"))
}
