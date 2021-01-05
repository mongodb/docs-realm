let realm = try! Realm()

try! realm.write {
    // Delete all instances of Dog from the realm.
    let allDogs = realm.objects(CrudExample_Dog.self)
    realm.delete(allDogs);
}