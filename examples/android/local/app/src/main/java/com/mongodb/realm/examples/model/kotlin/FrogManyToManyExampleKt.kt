package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogManyToManyExampleKt": "Frog"
//    }
// }
import io.realm.RealmList
import io.realm.RealmObject

class FrogManyToManyExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    var bestFriends // :emphasize:
            : RealmList<FrogManyToManyExampleKt>? = null

    constructor(
        name: String?,
        age: Int,
        species: String?,
        owner: String?,
        bestFriends: RealmList<FrogManyToManyExampleKt>?
    ) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
        this.bestFriends = bestFriends
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :code-block-end: