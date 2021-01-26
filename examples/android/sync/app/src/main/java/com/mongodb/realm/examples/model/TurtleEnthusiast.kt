package com.mongodb.realm.examples.model

import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.LinkingObjects
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class TurtleEnthusiast(var name : String? = null, var age : Int = 0): RealmObject() {
    @PrimaryKey
    var _id : ObjectId = ObjectId()
    @LinkingObjects("owner")
    val turtles : RealmResults<Turtle>? = null
}