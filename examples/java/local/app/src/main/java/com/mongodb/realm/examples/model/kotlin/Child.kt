package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmObject
// :code-block-start: one-to-one-relationship
open class Child : RealmObject() {
    var frog: Frog? = null
}
// :code-block-end:
