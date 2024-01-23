// Pass the object type as a query parameter
val findFrogs = realm.query<Frog>()
    // Filter results
    .query("owner == $0", "Jim Henson")
    // Sort results
    .sort("age", Sort.ASCENDING)
    // Run the query
    .find()
// ... work with the results
