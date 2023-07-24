// Add a subscription named "team_developer_education"
realm.subscriptions.update{ realm ->
        add(
            realm.query<Team>("teamName == $0", "Developer Education"),
            "team_dev_ed"
        )
    }
