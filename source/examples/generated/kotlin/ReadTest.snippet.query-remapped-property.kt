val queryKotlinName = realm.query<ExamplePropertyAnnotations_Frog>("species == $0", "Muppetarium Amphibius").find().first()

val queryRemappedName = realm.query<ExamplePropertyAnnotations_Frog>("latin_name == $0", "Muppetarium Amphibius").find().first()

// Both queries return the same object
assertEquals(queryKotlinName, queryRemappedName)
