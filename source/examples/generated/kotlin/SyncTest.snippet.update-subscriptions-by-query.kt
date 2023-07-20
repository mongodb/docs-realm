val subscription =
    realm.subscriptions.findByQuery(
        realm.query<Task>("teamName == $0", "Developer Education")
    )
if (subscription != null) {
    realm.subscriptions.update {
        this.remove(subscription)
        this.add(
            realm.query<Task>("teamName == $0", "DevEd"),
            "team_developer_education"
        )
    }
}
