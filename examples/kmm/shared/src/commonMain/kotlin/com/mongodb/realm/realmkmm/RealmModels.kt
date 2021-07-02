package com.mongodb.realm.realmkmm

import io.realm.RealmObject

class Person : RealmObject {
    var name: String = "Foo"
    var dog: Dog? = null
}

class Dog : RealmObject {
    var name: String = ""
    var age: Int = 0
}

// :code-block-start: landing-page-model
class Frog : RealmObject {
    var name: String = ""
    var age: Int = 0
    var species: String? = null
    var owner: String? = null
}
// :code-block-end:

// :code-block-start: quick-start-model
class Task : RealmObject {
    var name: String = "new task"
    var status: String = "Open"
}
// :code-block-end:
