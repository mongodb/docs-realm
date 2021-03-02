package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogListExampleKt": "Frog"
//    }
// }
import io.realm.RealmList
import io.realm.RealmObject

class FrogListExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    var favoriteColors : RealmList<String>? = null // :emphasize:

    constructor(
        name: String?,
        age: Int,
        species: String?,
        owner: String?,
        favoriteColors: RealmList<String>?
    ) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
        this.favoriteColors = favoriteColors
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :code-block-end: