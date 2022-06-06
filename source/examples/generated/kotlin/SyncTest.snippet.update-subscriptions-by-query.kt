val subscription =
    realm.subscriptions.findByQuery(
        realm.query<Movie>("name == $0", "name value"))
if (subscription != null) {
    realm.subscriptions.update {
        this.remove(subscription)
        this.add(
            realm.query<Movie>(
                "name == $0",
                "another name value"
            ),
            "subscription name"
        )
    }
}
