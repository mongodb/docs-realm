val queryFrogLovesNumbers = realm.query<Frog>("favoriteThing.@type == 'int'")
val findFrog = queryFrogLovesNumbers.find().first()
