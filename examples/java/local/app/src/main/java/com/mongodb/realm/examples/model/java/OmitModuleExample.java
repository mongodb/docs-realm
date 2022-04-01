package com.mongodb.realm.examples.model.java;
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "OmitModuleExample": "MyModule",
//       "FrogEmbeddedExample": "Frog",
//       "FlyEmbeddedExample": "Fly"
//    }
// }
import io.realm.annotations.RealmModule;

@RealmModule(classes = { FrogEmbeddedExample.class, FlyEmbeddedExample.class }) // :emphasize:
public class OmitModuleExample {
}
// :replace-end:
// :code-block-end:
