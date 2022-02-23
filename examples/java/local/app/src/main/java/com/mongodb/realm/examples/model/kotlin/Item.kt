package com.mongodb.realm.examples.model.kotlin
// :code-block-start: complete

import io.realm.RealmObject

open class Item(var id: Int = 0,
                var name: String? = null): RealmObject()
// :code-block-end: