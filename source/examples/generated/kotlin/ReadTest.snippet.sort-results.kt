// Query for all frogs owned by Jim Henson, then:
// 1. Sort the results by age in descending order
// 2. Limit results to only distinct names
// 3. Limit results to only the first 2 objects

val organizedWithMethods = realm.query<ExampleRealmObject_Frog>("owner == $0", "Jim Henson")
    .sort("age", Sort.DESCENDING)
    .distinct("name")
    .limit(2)
    .find()
organizedWithMethods.forEach { frog ->
    Log.v("Method sort: ${frog.owner} owns a frog aged ${frog.age}")
}

val organizedWithRql = realm.query<ExampleRealmObject_Frog>()
    .query("owner == $0 SORT(age DESC) DISTINCT(name) LIMIT(2)", "Jim Henson") // :emphasize-line:
    .find()
organizedWithRql.forEach { frog ->
    Log.v("RQL sort: ${frog.owner} owns a frog aged ${frog.age}")
}

val organizedWithBoth = realm.query<ExampleRealmObject_Frog>()
    .query("owner == $0 SORT(age DESC)", "Jim Henson")
    .distinct("name")
    .limit(2)
    .find()
organizedWithBoth.forEach { frog ->
    Log.v("Combined sort: ${frog.owner} owns a frog aged ${frog.age}")
}
