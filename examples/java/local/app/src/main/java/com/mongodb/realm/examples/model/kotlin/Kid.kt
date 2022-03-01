package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmList
import io.realm.RealmObject

// :code-block-start: one-to-many-relationship
class Kid : RealmObject() {
    var frogs = RealmList<Frog>()
}
// :code-block-end:
