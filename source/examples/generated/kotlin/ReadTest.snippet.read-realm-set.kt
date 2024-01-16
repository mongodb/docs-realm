// Find frogs who have a favorite snack of flies or crickets
val potentialFrogs = query<RealmSet_Frog>("favoriteSnacks.name CONTAINS $0 OR favoriteSnacks.name CONTAINS $1", "Flies", "Crickets").find()

// Filter only frogs with both as a favorite snack
val requiredSnacks = setOf("Flies", "Crickets")
val frogsThatLikeBoth = potentialFrogs.filter { frog ->
    requiredSnacks.all { requiredSnack ->
        frog.favoriteSnacks.any { snack -> snack.name == requiredSnack }
    }
}
for (frog in frogsThatLikeBoth) {
    Log.v("${frog.name} likes both Flies and Crickets")
}
