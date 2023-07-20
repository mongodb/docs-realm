realm.subscriptions.update {
    add(
        realm.query<Task>("progressMinutes >= 60")
    )
}
