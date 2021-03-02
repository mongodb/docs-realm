package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogManyToOneExampleKt": "Frog"
//    }
// }
import io.realm.RealmObject

class FrogManyToOneExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    var bestFriend // :emphasize:
            : FrogManyToOneExampleKt? = null

    constructor(
        name: String?,
        age: Int,
        species: String?,
        owner: String?,
        bestFriend: FrogManyToOneExampleKt?
    ) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
        this.bestFriend = bestFriend
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :code-block-end: