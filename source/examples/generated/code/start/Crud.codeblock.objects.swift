let realm = try! Realm()
// Access all dogs in the realm
let dogs = realm.objects(CrudExample_Dog.self);