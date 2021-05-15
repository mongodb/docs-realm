package com.mongodb.realm.examples.model
// :code-block-start: plant
import org.bson.types.ObjectId

open class Plant(val id : ObjectId = ObjectId(),
                 var name : String? = null,
                 var sunlight : String? = null,
                 var color : String? = null,
                 var type : String? = null,
                 var partition : String? = null) {
    override fun toString(): String {
        return "Plant [id=$id, name=$name, sunlight=$sunlight, color=$color, type=$type, partition=$partition]"
    }
}
// :code-block-end: