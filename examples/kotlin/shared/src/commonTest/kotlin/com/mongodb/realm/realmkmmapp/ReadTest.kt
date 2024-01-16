package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.*
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.notifications.InitialResults
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.query.Sort
import io.realm.kotlin.query.max
import io.realm.kotlin.types.RealmAny
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.flow.Flow
import org.mongodb.kbson.ObjectId
import kotlin.test.*

// :replace-start: {
//    "terms": {
//       "ExampleRealmObject_": "",
//       "RealmObjectProperties_": "",
//       "ExampleEmbeddedObject_": "",
//       "ExampleRelationship_": "",
//       "ExampleRealmList_": "",
//       "ExampleRealmDictionary_": "",
//       "ExampleRealmSet_": "",
//       "RealmEmbeddedObject_": ""
//    }
// }

/*
** Snippets used on Read page **
** Object models defined in Schema.kt **
 */


class ReadTest: RealmTest() {

    @Test
    fun readRealmObject() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: read-realm-object
            val findFrogs =
                // Pass the object type from your database schema that you want to query
                realm.query<ExampleRealmObject_Frog>()
                    // Filter results
                    .query("owner == $0", "Jim Henson")
                    // Sort results
                    .sort("age", Sort.ASCENDING)
                    // Run the query
                    .find()
            // ... work with the results
            // :snippet-end:
            val frozenFrogs = findFrogs
            // :snippet-start: find-latest-version
            // Open a write transaction to access the MutableRealm
            realm.write {  // this: MutableRealm
                val livingFrog = findLatest(frozenFrogs.first())
                if (livingFrog != null) {
                    assertFalse(livingFrog.isFrozen())
                }
                for (frog in frozenFrogs) {
                    // Call 'findLatest()' on an earlier query's frozen results
                    // to return the latest live objects that you can modify
                    // within the current write transaction
                    findLatest(frog)?.also { liveFrog ->  // :emphasize-line:
                        copyToRealm(liveFrog.apply { age += 1 })
                        println(liveFrog.name + " is now " + liveFrog.age + " years old")
                    }
                }
            }
            assertTrue(frozenFrogs.first().isFrozen())
            // :snippet-end:
            val thrownException = assertFailsWith<Exception> {
            // :snippet-start: frozen-vs-live-results
            // 'Realm.query()' always returns frozen results
            val realmQuery =
                realm.query<ExampleRealmObject_Frog>("age > $0", 50).find()
            // Trying to modify a frozen object throws 'IllegalStateException'
            realmQuery.first().age += 1

            // :remove-start:
            }
            assertTrue(
                thrownException.message!!.contains("[RLM_ERR_WRONG_TRANSACTION_STATE]"),
                "Trying to modify database while in read transaction"
            )
            // :remove-end:
            // Open a write transaction to access the MutableRealm
            realm.write { // this: MutableRealm
                // 'MutableRealm.query()' returns live results
                val mutableRealmQuery =
                    this.query<ExampleRealmObject_Frog>("age > $0", 50).find()
                // Can successfully modify queried object
                mutableRealmQuery.first().age += 1
                assertEquals(102, mutableRealmQuery.first().age) // :remove:
            }
            // :snippet-end:
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun synchronousQuery() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
                // :snippet-start: synchronous-query
                val queryAllFrogs = realm.query<ExampleRealmObject_Frog>()
                // Returns a RealmResults collection
                val allFrogs: RealmResults<ExampleRealmObject_Frog> = queryAllFrogs.find()

                val asyncQueryAllFrogs = this.query<ExampleRealmObject_Frog>() // this: MutableRealm
                // Returns a ResultsChange Flow (MUST be called from 'MutableRealm.query()')
                val allFrogsFlow = asyncQueryAllFrogs.asFlow()
                // :snippet-end:
            }
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryByObjectType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val PRIMARY_KEY_VALUE = ObjectId()
            realm.write {
                deleteAll()
                copyToRealm( ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    _id = PRIMARY_KEY_VALUE
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: query-by-object-type
            // Query for all objects of a type
            val queryAllFrogs = realm.query<ExampleRealmObject_Frog>()
            val allFrogs = queryAllFrogs.find()
            // :snippet-end:
            assertEquals(3, allFrogs.size)
            // :snippet-start: query-single-object
            val tadpoleQuery = realm.query<ExampleRealmObject_Frog>("age < $0", 1).first()
            val findTadpole = tadpoleQuery.find()

            if (findTadpole != null) {
                println("${findTadpole.name} is a tadpole.")
            } else {
                println("No tadpoles found.")
            }
            // :snippet-end:
            // :snippet-start: find-by-primary-key
            val queryByPrimaryKey = realm.query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
            // :snippet-end:
            assertEquals(PRIMARY_KEY_VALUE, queryByPrimaryKey._id)
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryEmbeddedObjects() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(
                    ExampleRelationship_Contact::class,
                    ExampleRelationship_EmbeddedCountry::class,
                    ExampleRelationship_EmbeddedAddress::class
                )
            )
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm( ExampleRelationship_Contact().apply {
                    name = "Kermit"
                    address = ExampleRelationship_EmbeddedAddress().apply {
                        propertyOwner = ExampleRelationship_Contact().apply { name = "Mr. Frog" }
                        street = "123 Pond St"
                        country = ExampleRelationship_EmbeddedCountry().apply { name = "United States" }
                    } })
            }
            // :snippet-start: find-embedded-object
            val findEmbeddedObject = realm.query<ExampleRelationship_EmbeddedAddress>().find().first()
            // :snippet-end:
            // :snippet-start: get-parent
            val getParent = findEmbeddedObject.parent<ExampleRelationship_Contact>()
            // :snippet-end:
            // :snippet-start: query-embedded-object-property
            // Use dot notation to access the embedded object properties as if it
            // were in a regular nested object
            val queryEmbeddedObjectProperty =
                realm.query<ExampleRelationship_Contact>("address.street == '123 Pond St'").find().first()

            // You can also query properties nested within the embedded object
            val queryNestedProperty = realm.query<ExampleRelationship_Contact>("address.propertyOwner.name == $0", "Mr.Frog").find().first()
            // :snippet-end:
            assertEquals("Mr. Frog", findEmbeddedObject.propertyOwner?.name)
            assertEquals("Mr. Frog", queryEmbeddedObjectProperty.address?.propertyOwner?.name)
            assertEquals("Kermit", getParent.name)
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryRealmAnyProperty() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(RealmObjectProperties_Frog().apply {
                    name = "Kermit, Jr."
                    favoriteThings = realmListOf(
                        RealmAny.create(42),
                        RealmAny.create("rainbows"),
                        RealmAny.create(RealmObjectProperties_Frog().apply {
                            name = "Kermit Jr."
                        })) })
            }
            // :snippet-start: query-realmany-property
            val frog = realm.query<RealmObjectProperties_Frog>("ANY favoriteThings == $0", 42).find().first()
            println("${frog.name} likes the number 42")
            // :snippet-end:
            val frogsFavoriteThings = frog.favoriteThings
            // :snippet-start: get-realmany-property
            // Use the getter method specific to the stored type
            val correctType = frogsFavoriteThings[0]?.asInt()
            assertEquals(correctType, 42) // :remove:

            val thrownException = assertFailsWith<Exception> { // :remove:
            val wrongType = frogsFavoriteThings[0]?.asRealmUUID() // throws exception
            } // :remove:
            assertTrue(thrownException.message!!.contains("RealmAny type mismatch"))
            // :snippet-end:
            // :snippet-start: polymorphism
            // Handle possible types with a 'when' statement
            frogsFavoriteThings.forEach { realmAny ->
                if (realmAny != null) {
                    when (realmAny.type) {
                        RealmAny.Type.INT -> {
                            val intValue = realmAny.asInt()
                            // Do something with intValue ...
                        }
                        RealmAny.Type.STRING -> {
                            val stringValue = realmAny.asString()
                            // Do something with stringValue ...
                        }
                        RealmAny.Type.OBJECT -> {
                            val objectValue = realmAny.asRealmObject(RealmObjectProperties_Frog::class)
                            // Do something with objectValue ...
                        }
                        // Handle other possible types...
                        else -> {
                            // Debug or perform a default action for unhandled types
                            Log.d("Unhandled type: ${realmAny.type}")
                        }
                    }
                }
            }
            // :snippet-end:
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryProperties() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExamplePropertyAnnotations_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExamplePropertyAnnotations_Frog().apply {
                    name = "Kermit"
                    age = 42 // Ignored
                    species = "Muppetarium Amphibius" // Persisted name
                    physicalDescription = "Small green frog muppet with bulging eyes and skinny limbs." // FTS index
                })
                copyToRealm(ExamplePropertyAnnotations_Frog().apply {
                    name = "Kermit, Jr."
                    species = "Muppetarium Amphibius"
                    physicalDescription = "Tiny green frog that plays a small banjo. Extremely cute and friendly muppet. Is always under a rainbow."
                })
                copyToRealm(
                    ExamplePropertyAnnotations_Frog().apply {
                        name = "Kermit, Sr."
                        species = "Muppetarium Amphibius"
                        physicalDescription = "Big, mean, old, brown frog. Is technically a puppet that avoids the rain."
                    })
            }
            // :snippet-start: query-remapped-property
            val queryKotlinName = realm.query<ExamplePropertyAnnotations_Frog>("species == $0", "Muppetarium Amphibius").find().first()

            val queryRemappedName = realm.query<ExamplePropertyAnnotations_Frog>("latin_name == $0", "Muppetarium Amphibius").find().first()

            // Both queries return the same object
            assertEquals(queryKotlinName, queryRemappedName)
            // :snippet-end:
            // :snippet-start: query-fts-property
            // Find all frogs with "green" in the physical description
            val onlyGreenFrogs =
                realm.query<ExamplePropertyAnnotations_Frog>("physicalDescription TEXT $0", "green").find()
            assertEquals(2, onlyGreenFrogs.size) // :remove:

            // Find all frogs with "green" but not "small" in the physical description
            val onlyBigGreenFrogs =
                realm.query<ExamplePropertyAnnotations_Frog>("physicalDescription TEXT $0", "green -small").find()
            assertEquals(0, onlyBigGreenFrogs.size) // :remove:

            // Find all frogs with "muppet-" and "rain-" in the physical description
            val muppetsInTheRain =
                realm.query<ExamplePropertyAnnotations_Frog>("physicalDescription TEXT $0", "muppet* rain*").find()
            // :snippet-end:
            assertEquals(1, muppetsInTheRain.size)
            realm.write{ deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryRealmList(){
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(
                ExampleRealmList_Frog::class, ExampleRealmList_Pond::class, ExampleEmbeddedObject_EmbeddedForest::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmList_Frog().apply {
                    name = "Kermit"
                    favoritePonds.addAll(realmListOf(
                        ExampleRealmList_Pond().apply { name = "Picnic Pond" },
                        ExampleRealmList_Pond().apply { name = "Big Pond" }
                    ))
                })
                copyToRealm(ExampleRealmList_Frog().apply {
                    name = "Kermit, Jr."
                    favoritePonds.addAll(realmListOf(
                        ExampleRealmList_Pond().apply { name = "Tiny Pond" },
                        ExampleRealmList_Pond().apply { name = "Small Pond" }
                    ))
                })
            }
            realm.writeBlocking {
                // :snippet-start: read-realm-list
                // Find frogs with a favorite pond
                val allFrogs = query<ExampleRealmList_Frog>().find()
                val frogsWithFavoritePond = allFrogs.query("favoritePonds.@size > $0", 0).find()

                // Iterate through the results for frogs who like Big Pond
                for (frog in frogsWithFavoritePond) {
                    val likesBigPond = frog.favoritePonds.any { pond -> pond.name == "Big Pond" }
                    if (likesBigPond) {
                        Log.v("${frog.name} likes Big Pond")
                    } else {
                        Log.v("${frog.name} does not like Big Pond")
                    }
                }
                // :snippet-end:
                assertEquals(2, frogsWithFavoritePond.size)
                val actual = frogsWithFavoritePond.query("favoritePonds.name == $0", "Big Pond").find()
                assertEquals(1, actual.size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun readRealmSetType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSet_Frog::class, RealmSet_Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(RealmSet_Frog().apply {
                    name = "Kermit"
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Flies" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Crickets" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Worms" })
                })
                copyToRealm(RealmSet_Frog().apply {
                    name = "Kermit, Jr."
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Flies" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Gnats" })
                })
            }
            realm.write {
                // :snippet-start: read-realm-set
                // Find frogs who have a favorite snack of flies or crickets
                val potentialFrogs = query<RealmSet_Frog>("favoriteSnacks.name CONTAINS $0 OR favoriteSnacks.name CONTAINS $1", "Flies", "Crickets").find()

                // Filter only frogs with both as a favorite snack
                val requiredSnacks = setOf("Flies", "Crickets")
                val frogsThatLikeBoth = potentialFrogs.filter { frog ->
                    requiredSnacks.all { requiredSnack ->
                        frog.favoriteSnacks.any { snack -> snack.name == requiredSnack }
                    }
                }
                for (frog in frogsThatLikeBoth) {
                    Log.v("${frog.name} likes both Flies and Crickets")
                }
                // :snippet-end:
                assertEquals(2, potentialFrogs.size)
                assertEquals(1, frogsThatLikeBoth.size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun readRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmDictionary_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.write {
                deleteAll()
                copyToRealm(RealmDictionary_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya") })
            }
            // :snippet-start: read-realm-dictionary
            // Find frogs who have forests with favorite ponds
            val frogs = realm.query<RealmDictionary_Frog>().find()
            val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > $0", 1).find()
            val thisFrog = frogsWithFavoritePonds.first()

            // Iterate through the map and log each key-value pair
            for (forestName in thisFrog.favoritePondsByForest.keys) {
                val pondName = thisFrog.favoritePondsByForest[forestName]
                Log.v("Forest: $forestName, Pond: $pondName")
            }

            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) // :remove:
            // Check if the dictionary contains a key
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) // :remove:
            if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
                Log.v("${thisFrog.name}'s favorite pond in Hundred Acre Wood is ${thisFrog.favoritePondsByForest["Hundred Acre Wood"]}")
            }
            // Check if the dictionary contains a value
            assertTrue(thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) // :remove:
            if (thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) {
                Log.v("${thisFrog.name} lists Picnic Pond as a favorite pond")
            }
            // :snippet-end:
            assertEquals(2, thisFrog.favoritePondsByForest.size)
            realm.write { deleteAll() }
            realm.close()
        }
    }
    // :replace-end:

    @Test
    fun queryRelationships() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Forest::class, ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Frog().apply {
                    name = "Kermit"
                    age = 12
                    favoritePond = ExampleRelationship_Pond().apply { name = "Picnic Pond" }
                    bestFriend = ExampleRelationship_Frog().apply { name = "Froggy Jay" }
                })
                copyToRealm(ExampleRelationship_Forest().apply {
                    name = "Froggy Forest"
                    frogsThatLiveHere = realmSetOf(
                        ExampleRelationship_Frog().apply { name = "Kermit" },
                        ExampleRelationship_Frog().apply { name = "Froggy Jay" }
                    )
                    nearbyPonds = realmListOf(
                        ExampleRelationship_Pond().apply { name = "Small Picnic Pond" },
                        ExampleRelationship_Pond().apply { name = "Big Pond" }
                    )
                })
            }
            realm.write {
                // :snippet-start: query-to-one-relationship
                // Find frogs who have a favorite pond
                val allFrogs = query<ExampleRelationship_Frog>().find()
                val frogsWithFavoritePond = allFrogs.query("favoritePond.@count == $0", 1).find()

                // Iterate through the results
                for (frog in frogsWithFavoritePond) {
                    Log.v("${frog.name} likes ${frog.favoritePond?.name}")
                }
                // :snippet-end:
                val kermit = frogsWithFavoritePond.query("name == $0", "Kermit").find().first()
                val picnicPond = query<ExampleRelationship_Pond>("name == $0", "Picnic Pond").find().first()
                assertEquals(kermit.favoritePond, picnicPond)
                // :snippet-start: query-to-many-relationship
                // Find all forests with nearby pond
                val forests = query<ExampleRelationship_Forest>().find()
                val forestsWithPonds = forests.query("nearbyPonds.@count > $0", 1).find()
                val bigPond = query<ExampleRelationship_Pond>("name == $0", "Big Pond").find().first()

                // Iterate through the results
                for (forest in forestsWithPonds) {
                    if (forest.nearbyPonds.contains(bigPond)) {
                        Log.v("${forest.name} has a nearby pond named ${bigPond.name}")
                    } else {
                        Log.v("${forest.name} does not have a big pond nearby")
                    }
                }
                // :snippet-end:
                deleteAll()
            }
            realm.close()
        }
    }


    @Test
    fun queryInverseRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_User::class, ExampleRelationship_Post::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                val post1 = ExampleRelationship_Post().apply {
                    title = "Forest Life"
                    date = RealmInstant.from(1677628500, 0) // Feb 28 2023
                }
                val post2 = ExampleRelationship_Post().apply {
                    title = "Top Ponds of the Year!"
                    date = RealmInstant.from(1677628800, 0) // Mar 1 2023
                }

                val user = ExampleRelationship_User().apply {
                    name = "Kermit"
                    posts = realmListOf(post1, post2)
                }
                copyToRealm(user)
            }
            realm.write {
                // :snippet-start: query-inverse-relationship
                // Query the parent object to access the child objects
                val user = query<ExampleRelationship_User>("name == $0", "Kermit").find().first()
                val myFirstPost = user.posts[0]

                // Iterate through the backlink collection property
                user.posts.forEach { post ->
                    Log.v("${user.name}'s Post: ${post.date} - ${post.title}")
                }

                // Query the backlink with  `@links.<ObjectType>.<PropertyName>`
                val oldPostsByKermit = query<ExampleRelationship_User>("@links.ExampleRelationship_Post.date < $0", 1704124023)
                    .find()

                // Query the child object to access the parent
                val post1 = query<ExampleRelationship_Post>("title == $0", "Forest Life").find().first()
                val post2 = query<ExampleRelationship_Post>("title == $0", "Top Ponds of the Year!").find().first()
                val parent = post1.user.first()
                // :snippet-end:
                assertTrue(user.posts.containsAll(listOf(post1, post2)))
                assertEquals(2, user.posts.size)
                assertEquals(myFirstPost, post1)
                assertEquals("Kermit", parent.name)
                deleteAll()
            }
            realm.close()
        }
    }

    // :snippet-start: query-inverse-persisted-name
    @PersistedName(name = "Blog_Author")
    class RealmObjectProperties_User : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var name: String = ""
        var posts: RealmList<RealmObjectProperties_Post> = realmListOf()
    }
    // :remove-start:
    class RealmObjectProperties_Post : RealmObject {
        var title: String = ""
        var date: RealmInstant = RealmInstant.now()
        val user: RealmResults<RealmObjectProperties_User> by backlinks(RealmObjectProperties_User::posts)
    }
    @Test
    fun queryInverseRelationshipWithPersistedName() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_User::class, RealmObjectProperties_Post::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                val post1 = RealmObjectProperties_Post().apply {
                    title = "Forest Life"
                }
                val post2 = RealmObjectProperties_Post().apply {
                    title = "Top Ponds of the Year!"
                }

                val user = RealmObjectProperties_User().apply {
                    name = "Kermit"
                    posts = realmListOf(post1, post2)
                }
                copyToRealm(user)
            }
            // :remove-end:

            realm.write {
                // Query by the remapped class name
                val postsByKermit = query<RealmObjectProperties_Post>()
                    .query("@links.Blog_Author.name == $0", "Kermit")
                    .find()
                // :snippet-end:
                assertEquals(2, postsByKermit.size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun sortResults() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: sort-results
            // Query for all frogs owned by Jim Henson, then:
            // 1. Sort the results by age in descending order
            // 2. Limit results to only distinct names
            // 3. Limit results to only the first 2 objects

            val organizedWithMethods = realm.query<ExampleRealmObject_Frog>("owner == $0", "Jim Henson")
                // :emphasize-start:
                .sort("age", Sort.DESCENDING)
                .distinct("name")
                .limit(2)
                // :emphasize-end:
                .find()
            organizedWithMethods.forEach { frog ->
                Log.v("Method sort: ${frog.owner} owns a frog aged ${frog.age}")
            }

            val organizedWithRql = realm.query<ExampleRealmObject_Frog>()
                .query("owner == $0 SORT(age DESC) DISTINCT(name) LIMIT(2)", "Jim Henson") // :emphasize-line:
                .find()
            organizedWithRql.forEach { frog ->
                Log.v("RQL sort: ${frog.owner} owns a frog aged ${frog.age}")
            }
            assertEquals(organizedWithMethods, organizedWithRql) // :remove:

            val organizedWithBoth = realm.query<ExampleRealmObject_Frog>()
                // :emphasize-start:
                .query("owner == $0 SORT(age DESC)", "Jim Henson")
                .distinct("name")
                .limit(2)
                // :emphasize-end:
                .find()
            organizedWithBoth.forEach { frog ->
                Log.v("Combined sort: ${frog.owner} owns a frog aged ${frog.age}")
            }
            // :snippet-end:
        }
    }

    @Test
    fun aggregateResults() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class, ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: aggregate-results
            val jimHensonsFrogs = realm.query<ExampleRealmObject_Frog>("owner == $0", "Jim Henson")
            // Find the oldest frog owned by Jim Henson
            val maxAge = jimHensonsFrogs.max<Int>("age").find()
            val oldestFrog = jimHensonsFrogs.query("age == $0", maxAge).find().first()
            // :snippet-end:
            assertEquals(100, oldestFrog.age)
//            realm.write {
//                copyToRealm(RealmObjectProperties_Frog().apply {
//                    name = "Kermit"
//                    favoriteThings = realmListOf(
//                        RealmAny.create(42),
//                        RealmAny.create("rainbows"),
//                        RealmAny.create(RealmObjectProperties_Frog().apply { name = "Froggy Jay" }))
//                })
//                copyToRealm(RealmObjectProperties_Frog().apply {
//                    name = "Kermit, Jr."
//                    favoriteThings = realmListOf(
//                        RealmAny.create(42.toByte()),
//                        RealmAny.create(42.toChar()),
//                        RealmAny.create(true))
//                })
//                copyToRealm(RealmObjectProperties_Frog().apply {
//                    name = "Kermit, Sr."
//                    favoriteThings = realmListOf(
//                        RealmAny.create(42L),
//                        RealmAny.create(ObjectId()),
//                        RealmAny.create(42.toShort()))
//                })
//            }
//
//            val aggregateByRealmAny = realm.query<RealmObjectProperties_Frog>()
//                .query("favoriteThings.@count > $0", 0)
//                .find()
//            val favoriteThing = aggregateByRealmAny.forEach { frog ->
//                frog.
//            }
//            for (frog in aggregateByRealmAny) {
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun iterateResultsWithFlow() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: iteration
            // Get a Flow of all frogs in the database
            val allFrogsQuery = realm.query<ExampleRealmObject_Frog>()
            val frogsFlow: Flow<ResultsChange<ExampleRealmObject_Frog>> = allFrogsQuery.asFlow()

            // Iterate through the Flow with 'collect()'
            val frogsObserver: Deferred<Unit> = async {
                frogsFlow.collect { results ->
                    when (results) {
                        is InitialResults<ExampleRealmObject_Frog> -> {
                            for (frog in results.list) {
                                Log.v("Frog: $frog")
                            }
                        }

                        else -> {
                            // No-op
                        }
                    }
                }
            }

            // ... Later, cancel the Flow, so you can safely close the database
            frogsObserver.cancel()
            realm.write { deleteAll() } // :remove:
            realm.close()
            // :snippet-end:
        }
    }
}
