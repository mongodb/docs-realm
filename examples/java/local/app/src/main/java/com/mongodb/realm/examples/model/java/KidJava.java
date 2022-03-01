package com.mongodb.realm.examples.model.java;

import com.mongodb.realm.examples.model.kotlin.Frog;

import io.realm.RealmList;
import io.realm.RealmObject;

// :code-block-start: one-to-many-relationship
// :replace-start: {
//    "terms": {
//       "KidJava": "Kid"
//    }
// }
public class KidJava
        extends RealmObject {
    public RealmList<Frog> frogs =
            new RealmList<Frog>();
}
// :replace-end:
// :code-block-end:
