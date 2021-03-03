package com.mongodb.realm.examples.model.kotlin

import com.mongodb.realm.examples.model.java.FlyEmbeddedExample
import com.mongodb.realm.examples.model.java.FrogEmbeddedExample
import io.realm.annotations.RealmModule

@RealmModule(classes = [FrogEmbeddedExample::class, FlyEmbeddedExample::class])
class BundledRealmModule {

}