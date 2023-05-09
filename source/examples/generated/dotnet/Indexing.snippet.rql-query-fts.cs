var filteredScientists = realm.All<Person>()
    .Filter("Biography TEXT $0", "Scientist");
