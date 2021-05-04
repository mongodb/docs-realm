import io.realm.RealmAny
import io.realm.RealmObject

open class Frog : RealmObject() {
    var name: String? = null
    var bestFriend: RealmAny? = null
}
