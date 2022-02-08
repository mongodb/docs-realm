import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class LastSynced : RealmObject {
    var timestamp: Long? = null

    @PrimaryKey
    var _id: ObjectId? = null

    constructor(timestamp: Long?, id: ObjectId?) {
        this.timestamp = timestamp
        _id = id
    }

    constructor() {}
}
