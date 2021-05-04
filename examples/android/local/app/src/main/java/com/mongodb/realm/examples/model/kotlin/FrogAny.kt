package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogAny": "Frog"
//    }
// }
import io.realm.RealmAny
import io.realm.RealmObject

open class FrogAny : RealmObject() {
    var name: String? = null
    var bestFriend: RealmAny? = null
}
// :replace-end:
// :code-block-end: