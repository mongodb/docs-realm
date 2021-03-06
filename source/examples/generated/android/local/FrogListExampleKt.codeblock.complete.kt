import io.realm.RealmList
import io.realm.RealmObject

open class Frog : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    var favoriteColors : RealmList<String>? = null 

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
