package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.FrogAny;
import com.mongodb.realm.examples.model.java.FrogDictionary;
import com.mongodb.realm.examples.model.java.FrogSet;
import com.mongodb.realm.examples.model.java.GroupOfPeople;
import com.mongodb.realm.examples.model.java.Snack;
import com.mongodb.realm.examples.model.kotlin.Frog;
import com.mongodb.realm.examples.model.kotlin.Person;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.Map;

import io.realm.Realm;
import io.realm.RealmAny;
import io.realm.RealmConfiguration;
import io.realm.RealmDictionary;
import io.realm.RealmSet;

public class DataTypesTest extends RealmTest {

    @Test
    public void testRealmAny() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .inMemory()
                    .name("realmset-test-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);

            realm.executeTransaction(r -> {
                // :replace-start: {
                //    "terms": {
                //       "FrogAny": "Frog"
                //    }
                // }
                // :code-block-start: realmany
                FrogAny frog = realm.createObject(FrogAny.class);
                frog.setName("Jonathan Livingston Applesauce");
              
                // set RealmAny field to a null value
                frog.setBestFriend(RealmAny.nullValue());
                Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString());

                // possible types for RealmAny are defined in RealmAny.Type
                Assert.assertTrue(frog.getBestFriend().getType() == RealmAny.Type.NULL);

                // set RealmAny field to a string with RealmAny.valueOf a string value
                frog.setBestFriend(RealmAny.valueOf("Greg"));
                Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString());

                // RealmAny instances change type as you reassign to different values
                Assert.assertTrue(frog.getBestFriend().getType() == RealmAny.Type.STRING);

                // set RealmAny field to a realm object, also with valueOf
                Person person = new Person("Jason Funderburker");

                frog.setBestFriend(RealmAny.valueOf(person));
                Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString());

                // You can also extract underlying Realm Objects from RealmAny with asRealmModel
                Person bestFriendObject = frog.getBestFriend().asRealmModel(Person.class);
                Log.v("EXAMPLE", "Best friend: " + bestFriendObject.getName());

                // RealmAny fields referring to any Realm Object use the OBJECT type
                Assert.assertTrue(frog.getBestFriend().getType() == RealmAny.Type.OBJECT);

                // you can't put a RealmList in a RealmAny field directly,
                // ...but you can set a RealmAny field to a RealmObject that contains a list
                GroupOfPeople persons = new GroupOfPeople();
                // GroupOfPeople contains a RealmList of people
                persons.getPeople().add("Rand");
                persons.getPeople().add("Perrin");
                persons.getPeople().add("Mat");

                frog.setBestFriend(RealmAny.valueOf(persons));
                Log.v("EXAMPLE", "Best friend: " + frog.getBestFriend().asRealmModel(GroupOfPeople.class).getPeople().toString());
                // :code-block-end:
                // :replace-end:
                expectation.fulfill();
            });
        });
        expectation.await();
    }

    @Test
    public void testRealmSet() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .inMemory()
                    .name("realmset-test-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);

            realm.executeTransaction(r -> {
                // :replace-start: {
                //    "terms": {
                //       "FrogSet": "Frog"
                //    }
                // }
                // :code-block-start: realmSet
                FrogSet frog = realm.createObject(FrogSet.class);
                frog.setName("George Washington");

                // get the RealmSet field from the object we just created
                RealmSet<Snack> set = frog.getFavoriteSnacks();

                // add value to the RealmSet
                Snack flies = realm.createObject(Snack.class);
                flies.setName("flies");
                set.add(flies);

                // add multiple values to the RealmSet
                Snack water = realm.createObject(Snack.class);
                water.setName("water");
                Snack verySmallRocks = realm.createObject(Snack.class);
                verySmallRocks.setName("verySmallRocks");
                set.addAll(Arrays.asList(water, verySmallRocks));

                // check for the presence of a key with contains
                Assert.assertTrue(set.contains(flies));

                // check for the presence of multiple keys with containsAll
                Snack biscuits = realm.createObject(Snack.class);
                biscuits.setName("biscuits");
                Assert.assertTrue(set.containsAll(Arrays.asList(water, biscuits)) == false);

                // remove string from a set
                set.remove(verySmallRocks);

                // set no longer contains that string
                Assert.assertTrue(set.contains(verySmallRocks) == false);

                // deleting a Realm object also removes it from any RealmSets
                int sizeOfSetBeforeDelete = set.size();
                flies.deleteFromRealm();
                // deleting flies object reduced the size of the set by one
                Assert.assertTrue(sizeOfSetBeforeDelete == set.size() + 1);
                // :code-block-end:
                // :replace-end:
                expectation.fulfill();
            });
        });
        expectation.await();
    }


    @Test
    public void testRealmDictionary() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .inMemory()
                    .name("realmdictionary-test-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);

            realm.executeTransaction(r -> {
                // :replace-start: {
                //    "terms": {
                //       "FrogDictionary": "Frog"
                //    }
                // }
                // :code-block-start: realmDictionary
                FrogDictionary frog = realm.createObject(FrogDictionary.class);
                frog.setName("George Washington");

                // get the RealmDictionary field from the object we just created
                RealmDictionary<FrogDictionary> dictionary = frog.getNicknamesToFriends();

                // add key/value to the dictionary
                FrogDictionary wirt = realm.createObject(FrogDictionary.class);
                wirt.setName("Wirt");
                dictionary.put("tall frog", wirt);

                // add multiple keys/values to the dictionary
                FrogDictionary greg = realm.createObject(FrogDictionary.class);
                greg.setName("Greg");
                FrogDictionary beatrice = realm.createObject(FrogDictionary.class);
                beatrice.setName("Beatrice");
                dictionary.putAll(Map.of("small frog", greg, "feathered frog", beatrice));

                // check for the presence of a key
                Assert.assertTrue(dictionary.containsKey("small frog"));

                // check for the presence of a value
                Assert.assertTrue(dictionary.containsValue(greg));

                // remove a key
                dictionary.remove("feathered frog");
                Assert.assertFalse(dictionary.containsKey("feathered frog"));

                // deleting a Realm object does NOT remove it from the dictionary
                int sizeOfDictionaryBeforeDelete = dictionary.size();
                greg.deleteFromRealm();
                // deleting greg object did not reduce the size of the dictionary
                Assert.assertEquals(sizeOfDictionaryBeforeDelete, dictionary.size());
                // but greg object IS now null:
                Assert.assertEquals(dictionary.get("small frog"), null);
                // :code-block-end:
                // :replace-end:
                expectation.fulfill();
            });
        });
        expectation.await();
    }
}
