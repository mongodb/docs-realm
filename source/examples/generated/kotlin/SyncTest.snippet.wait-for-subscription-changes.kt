// make an update to the list of subscriptions
realm.subscriptions.update {
    this.add(realm.query<Movie>("name == $0", "another name value"), "another subscription name")
}
// wait for subscription to fully synchronize changes
realm.subscriptions.waitForSynchronization(Duration.parse("10s"))
