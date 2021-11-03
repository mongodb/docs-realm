package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogStateKt": "FrogState"
//    }
// }
enum class FrogStateKt(val state: String) {
    TADPOLE("Tadpole"),
    FROG("Frog"),
    OLD_FROG("Old Frog");
}
// :replace-end:
// :code-block-end: