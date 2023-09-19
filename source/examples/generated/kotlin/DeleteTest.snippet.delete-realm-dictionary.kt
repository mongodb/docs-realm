// Find frogs who have forests with favorite ponds
val frogs = realm.query<Frog>().find()
val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > 1").find()
val thisFrog = frogsWithFavoritePonds.first()
// Set an optional value for a key to null if the key exists
if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
    realm.write {
        val mutableFrog = findLatest(thisFrog)
        if (mutableFrog != null) {
            mutableFrog.favoritePondsByForest["Hundred Acre Wood"] = null
        }
    }
}
// Remove a key and its value
realm.write {
    findLatest(thisFrog)?.favoritePondsByForest?.remove("Lothlorien")
}
