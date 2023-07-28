// Find frogs who have forests with favorite ponds
val frogs = realm.query<Frog>().find()
val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > $0", 1).find()
val thisFrog = frogsWithFavoritePonds.first()
Log.v("${thisFrog.name} has favorite ponds in these forests: ")
// You can iterate through keys or values
for (key in thisFrog.favoritePondsByForest.keys) Log.v(key)
// Check if a dictionary contains a key
if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
    Log.v("${thisFrog.name}'s favorite pond in Hundred Acre Wood is ${thisFrog.favoritePondsByForest["Hundred Acre Wood"]}")
}
// Check if a dictionary contains a value
if (thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) {
    Log.v("${thisFrog.name}'s lists Picnic Pond as a favorite pond")
}
