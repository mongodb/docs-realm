// Find frogs who have forests with favorite ponds
val frogs = realm.query<Frog>().find()
val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > 1").find()
val thisFrog = frogsWithFavoritePonds.first()
// Update the value for a key if it exists
if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
    realm.write {
        findLatest(thisFrog)?.favoritePondsByForest?.set(
            "Hundred Acre Wood",
            "Lily Pad Pond"
        )
    }
}
// Add a new key-value pair
realm.write {
    findLatest(thisFrog)?.favoritePondsByForest?.put("Sherwood Forest", "Miller Pond")
}
