package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.ext.realmDictionaryOf
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.types.*
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId


// :replace-start: {
//    "terms": {
//       "ExampleRealmObject_": "",
//       "RealmList_": "",
//       "RealmDictionary_": "",
//       "RealmSet_": ""
//   }
// }

/*
** Define Realm Object Model page examples **
 */

// :snippet-start: define-realm-object
// Implements the `RealmObject` interface
class ExampleRealmObject_Frog : RealmObject { // Empty constructor required by Realm
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int = 0
    var species: String? = null
    var owner: String? = null
}
// :snippet-end:
class ExampleRealmObject_Forest : EmbeddedRealmObject {
    var id: ObjectId = ObjectId()
    var name: String = ""
}

/*
Tested in AsymmetricSyncTest.kt
 */
// :snippet-start: define-asymmetric-model
// Implements the `AsymmetricRealmObject` interface
class WeatherSensor : AsymmetricRealmObject {
    @PersistedName("_id")
    @PrimaryKey
    var id: ObjectId = ObjectId()
    var deviceId: String = ""
    var temperatureInFarenheit: Float = 0.0F
    var barometricPressureInHg: Float = 0.0F
    var windSpeedInMph: Int = 0
}
// :snippet-end:

// :snippet-start: define-a-realm-list
// RealmList<E> can be any supported primitive
// or BSON type, a RealmObject, or an EmbeddedRealmObject
class RealmList_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of RealmObject type (CANNOT be nullable)
    var favoritePonds: RealmList<RealmList_Pond> = realmListOf()
    // List of EmbeddedRealmObject type (CANNOT be nullable)
    var favoriteForests: RealmList<ExampleRealmObject_Forest> = realmListOf()
    // List of primitive type (can be nullable)
    var favoriteWeather: RealmList<String?> = realmListOf()
}

class RealmList_Pond : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
// :snippet-end:

/*
Tested in Create, Read, Update, and Delete.kt files
 */
// :snippet-start: define-a-realm-set
// RealmSet<E> can be any supported primitive or
// BSON type or a RealmObject
class RealmSet_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Set of RealmObject type (CANNOT be nullable)
    var favoriteSnacks: RealmSet<RealmSet_Snack> = realmSetOf()
    // Set of primitive type (can be nullable)
    var favoriteWeather: RealmSet<String?> = realmSetOf()
}

class RealmSet_Snack : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
// :snippet-end:

/*
Tested in Create, Read, Update, and Delete.kt files
 */
// :snippet-start: define-realm-dictionary-property
// RealmDictionary<K, V> can be any supported
// primitive or BSON types, a RealmObject, or
// an EmbeddedRealmObject
class RealmDictionary_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Dictionary of RealmObject type (value MUST be nullable)
    var favoriteFriendsByForest: RealmDictionary<RealmDictionary_Frog?> = realmDictionaryOf()
    // Dictionary of EmbeddedRealmObject type (value MUST be nullable)
    var favoriteForestsByForest: RealmDictionary<ExampleRealmObject_Forest?> = realmDictionaryOf()
    // Dictionary of primitive type (value can be nullable)
    var favoritePondsByForest: RealmDictionary<String?> = realmDictionaryOf()
}
// :snippet-end:
// :replace-end:
