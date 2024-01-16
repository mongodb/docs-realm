val findFrogs =
    // Pass the object type from your database schema that you want to query
    realm.query<Frog>()
        // Filter results
        .query("owner == $0", "Jim Henson")
        // Sort results
        .sort("age", Sort.ASCENDING)
        // Run the query
        .find()
// ... work with the results
