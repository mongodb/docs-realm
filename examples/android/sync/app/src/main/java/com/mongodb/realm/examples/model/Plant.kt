package com.mongodb.realm.examples.model
// :code-block-start: plant
import org.bson.Document
import org.bson.types.ObjectId

open class Plant(val _id : ObjectId,
                 var name : String,
                 var sunlight : String,
                 var color : String,
                 var type : String,
                 var _partition : String) : Document()
// :code-block-end: