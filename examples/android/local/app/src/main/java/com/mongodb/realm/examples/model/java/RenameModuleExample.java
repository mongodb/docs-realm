package com.mongodb.realm.examples.model.java;
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "RenameModuleExample": "MyModule"
//    }
// }
import io.realm.annotations.RealmModule;
import io.realm.annotations.RealmNamingPolicy;

@RealmModule(
        allClasses = true,
        classNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES, // :emphasize:
        fieldNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES // :emphasize:
)
public class RenameModuleExample {
}
// :replace-end:
// :code-block-end:
