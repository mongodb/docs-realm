package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogDictionaryKt": "Frog"
//    }
// }
import io.realm.RealmDictionary
import io.realm.RealmObject

open class FrogDictionaryKt
    : RealmObject() {
    var name: String? = null
    var nicknamesToFriends: RealmDictionary<FrogDictionaryKt> = RealmDictionary<FrogDictionaryKt>()
}
// :replace-end:
// :code-block-end: