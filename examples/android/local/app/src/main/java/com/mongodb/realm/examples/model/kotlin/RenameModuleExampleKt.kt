package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "RenameModuleExampleKt": "MyModule"
//    }
// }
import io.realm.annotations.RealmModule
import io.realm.annotations.RealmNamingPolicy

@RealmModule(
    allClasses = true,
    classNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES, // :emphasize:
    fieldNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES // :emphasize:
)
open class RenameModuleExampleKt
// :replace-end:
// :code-block-end: