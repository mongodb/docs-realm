package com.mongodb.realm.realmkmmapp

import com.mongodb.realm.realmkmmapp.RealmTest
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration

class Compacting: RealmTest() {

    class King: RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var name: String = ""
    }
    @Test
    fun openAndCloseARealmTest() {
        runBlocking {
            // :snippet-start: open-a-realm
            val config = RealmConfiguration.Builder(setOf(King::class))
                // :remove-start:
                .directory("/tmp/") // default location for jvm is... in the project root
                // :remove-end:
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-end:
            // :snippet-start: close-a-realm
            realm.close()
            // :snippet-end:
        }
    }
}