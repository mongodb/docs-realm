import org.bson.types.ObjectId

open class Plant(val _id : ObjectId = ObjectId(),
                 var name : String? = null,
                 var sunlight : String? = null,
                 var color : String? = null,
                 var type : String? = null,
                 var _partition : String? = null)
