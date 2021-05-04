package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogSetKt": "Frog",
//       "SnackKt": "Snack"
//    }
// }
import io.realm.RealmObject
import io.realm.RealmSet

open class FrogSetKt
    : RealmObject() {
    var name: String = ""
    var favoriteSnacks: RealmSet<SnackKt> = RealmSet<SnackKt>();
}
// :replace-end:
// :code-block-end: