import io.realm.DynamicRealmObject
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Onion : RealmObject {
    @PrimaryKey
    var _id: ObjectId? = null
    var lastUpdated: Long
    var varietal: String? = null
        set(varietal: String?) {
            lastUpdated = System.currentTimeMillis()
            field = varietal
        }

    constructor(id: ObjectId?, varietal: String?) {
        this._id = id
        lastUpdated = System.currentTimeMillis()
        this.varietal = varietal
    }

    constructor() {
        lastUpdated = System.currentTimeMillis()
    }

    constructor(obj: DynamicRealmObject) {
        _id = obj.getObjectId("_id")
        varietal = obj.getString("varietal")
        lastUpdated = obj.getLong("lastUpdated")
    }
}
