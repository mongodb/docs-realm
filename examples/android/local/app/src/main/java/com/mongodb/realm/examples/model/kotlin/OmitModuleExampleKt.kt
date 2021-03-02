package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "OmitModuleExampleKt": "MyModule",
//       "FrogEmbeddedExampleKt": "Frog",
//       "FlyEmbeddedExampleKt": "Fly"
//    }
// }
import io.realm.annotations.RealmModule

@RealmModule(classes = [FrogEmbeddedExampleKt::class, FlyEmbeddedExampleKt::class]) // :emphasize:
class OmitModuleExampleKt
// :replace-end:
// :code-block-end: