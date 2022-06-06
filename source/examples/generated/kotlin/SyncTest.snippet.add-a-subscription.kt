realm.subscriptions.update {
    this.add(realm.query<Movie>("name == $0", "another name value"), "another subscription name")
}
