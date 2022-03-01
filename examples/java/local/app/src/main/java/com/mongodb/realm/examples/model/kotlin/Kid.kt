package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmList
import io.realm.RealmObject

class Kid : RealmObject() {
    var frogs = RealmList<Frog>()
}