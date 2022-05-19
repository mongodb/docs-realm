package com.mongodb.realm.realmkmmapp

import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import kotlin.random.Random

class Person : RealmObject {
    var name: String = "Foo"
    var dog: Dog? = null
}

class Dog : RealmObject {
    var name: String = ""
    var age: Int = 0
}

// :snippet-start: landing-page-model
class Frog : RealmObject {
    var name: String = ""
    var age: Int = 0
    var species: String? = null
    var owner: String? = null
}
// :snippet-end:

// :snippet-start: quick-start-model
class Task : RealmObject {
    var name: String = "new task"
    var status: String = "Open"
}
// :snippet-end: