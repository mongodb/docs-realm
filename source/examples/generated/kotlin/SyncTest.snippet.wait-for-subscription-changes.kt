// Update the list of subscriptions
realm.subscriptions.update {
    this.add(
        realm.query<Team>("$0 IN members", "Bob Smith"),
        "bob_smith_teams"
    )
}
// Wait for subscription to fully synchronize changes
realm.subscriptions.waitForSynchronization(Duration.parse("10s"))
