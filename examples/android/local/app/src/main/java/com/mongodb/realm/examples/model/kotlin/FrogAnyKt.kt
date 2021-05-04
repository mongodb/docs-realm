package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogAnyKt": "Frog"
//    }
// }
import io.realm.RealmAny
import io.realm.RealmObject

open class FrogAnyKt : RealmObject() {
    var name: String? = null
    var bestFriend: RealmAny? = null
}
// :replace-end:
// :code-block-end: