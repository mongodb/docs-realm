package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogRenameAFieldExampleKt": "Frog"
//    }
// }
import io.realm.RealmObject
import io.realm.annotations.RealmField

class FrogRenameAFieldExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    @RealmField("latinName") var species: String? = null // :emphasize:
    var owner: String? = null

    constructor(name: String?, age: Int, species: String?, owner: String?) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :code-block-end: