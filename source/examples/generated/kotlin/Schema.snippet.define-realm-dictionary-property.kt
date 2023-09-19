// RealmDictionary<K, V> can be any supported
// primitive or BSON types, a RealmObject, or
// an EmbeddedRealmObject
class Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Dictionary of RealmObject type (value MUST be nullable)
    var favoriteFriendsByForest: RealmDictionary<Frog?> = realmDictionaryOf()
    // Dictionary of EmbeddedRealmObject type (value MUST be nullable)
    var favoriteForestsByForest: RealmDictionary<Forest?> = realmDictionaryOf()
    // Dictionary of primitive type (value can be nullable)
    var favoritePondsByForest: RealmDictionary<String?> = realmDictionaryOf()
}
