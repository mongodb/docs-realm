// You can iterate through keys or values
for (key in thisFrog.favoritePondsByForest.keys)
    Log.v(key)

// Check if a dictionary contains a key
if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
    Log.v("${thisFrog.name}'s favorite pond in Hundred Acre Wood is ${thisFrog.favoritePondsByForest["Hundred Acre Wood"]}")
}
// Check if a dictionary contains a value
if (thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) {
    Log.v("${thisFrog.name} lists Picnic Pond as a favorite pond")
}
