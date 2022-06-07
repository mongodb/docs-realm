realm.subscriptions.update {
    this.add(realm.query<Toad>("name == $0", "another name value"), "another subscription name")
}
