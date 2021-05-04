package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.java.FrogAny
import com.mongodb.realm.examples.model.java.GroupOfPeople
import com.mongodb.realm.examples.model.kotlin.Person
import io.realm.Realm
import io.realm.RealmAny
import io.realm.RealmConfiguration
import org.junit.Test


class DataTypesTest : RealmTest() {
    @Test
    fun testRealmAny() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .inMemory()
                .name("realmany-test-kotlin")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)

            realm.executeTransaction {
                // :code-block-start: realmany
                val frog = realm.createObject(FrogAny::class.java)
                frog.name = "George Washington"

                // set RealmAny field to a null value
                frog.bestFriend = RealmAny.nullValue()
                val noBestFriend = frog.bestFriend
                Log.v("EXAMPLE", "Best friend: $noBestFriend")
                assert(frog.bestFriend.type == RealmAny.Type.NULL)

                // set RealmAny field to a string with RealmAny.valueOf a string value
                frog.bestFriend = RealmAny.valueOf("Greg")
                val bestFriendString = frog.bestFriend.asString()
                Log.v("EXAMPLE", "Best friend: $bestFriendString")
                assert(frog.bestFriend.type == RealmAny.Type.STRING)

                // set RealmAny field to a realm object, also with valueOf
                val person =
                    Person("Jason Funderberker")
                frog.bestFriend = RealmAny.valueOf(person)
                val bestFriendObject =
                    frog.bestFriend.asRealmModel(Person::class.java)
                Log.v("EXAMPLE", "Best friend: ${bestFriendObject.name}")
                assert(frog.bestFriend.type == RealmAny.Type.OBJECT)

                // you can't put a RealmList in a RealmAny field directly,
                // ...but you can set a RealmAny field to a RealmObject that contains a list
                val persons = GroupOfPeople()
                // GroupOfPeople contains a RealmList of people
                persons.people.add("Rand")
                persons.people.add("Perrin")
                persons.people.add("Mat")
                frog.bestFriend = RealmAny.valueOf(persons)
                Log.v("EXAMPLE", "Best friend: " +
                        frog.bestFriend.asRealmModel(GroupOfPeople::class.java)
                            .people.toString())
                // :code-block-end:
            }
            expectation.fulfill()
        }
        expectation.await()
    }
}