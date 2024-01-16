// Find all forests with nearby pond
val forests = query<ExampleRelationship_Forest>().find()
val forestsWithPonds = forests.query("nearbyPonds.@count > $0", 1).find()
val bigPond = query<ExampleRelationship_Pond>("name == $0", "Big Pond").find().first()

// Iterate through the results
for (forest in forestsWithPonds) {
    if (forest.nearbyPonds.contains(bigPond)) {
        Log.v("${forest.name} has a nearby pond named ${bigPond.name}")
    } else {
        Log.v("${forest.name} does not have a big pond nearby")
    }
}
