val results = realm.query<Team>("teamName == $0", "Developer Education")
    .subscribe("team_developer_education")
