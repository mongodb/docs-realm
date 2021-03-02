package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogEmbeddedExampleKt": "Frog",
//       "FlyEmbeddedExampleKt": "Fly"
//    }
// }
import io.realm.RealmObject

class FrogEmbeddedExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    var lastMeal // :emphasize:
            : FlyEmbeddedExampleKt? = null

    constructor(
        name: String?,
        age: Int,
        species: String?,
        owner: String?,
        lastMeal: FlyEmbeddedExampleKt?
    ) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
        this.lastMeal = lastMeal
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :code-block-end: