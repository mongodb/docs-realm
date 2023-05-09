var scientists = realm.All<Person>()
    .Where(p => QueryMethods.FullTextSearch(p.Biography, "Scientist"));
