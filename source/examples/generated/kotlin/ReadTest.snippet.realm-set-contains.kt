val frog = query<Frog>("name == $0", "Kermit").find().first()
val snackSet = findLatest(frog)?.favoriteSnacks

// Check if the set contains a particular value
val wormSnack = snackSet?.first { it.name == "Worms" }
Log.v("Does Kermit eat worms?: ${snackSet?.contains(wormSnack)}") // true

// Check if the set contains multiple values
val containsAllSnacks = snackSet?.containsAll(snackSet)
Log.v("Does Kermit eat flies, crickets, and worms?: $containsAllSnacks") // true
