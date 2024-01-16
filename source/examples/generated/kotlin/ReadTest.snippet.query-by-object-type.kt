// Query for all objects of a type
val queryAllFrogs = realm.query<Frog>()
val allFrogs = queryAllFrogs.find()
