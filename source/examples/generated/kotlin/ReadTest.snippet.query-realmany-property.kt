val frog = realm.query<Frog>("ANY favoriteThings == $0", 42).find().first()
println("${frog.name} likes the number 42")
