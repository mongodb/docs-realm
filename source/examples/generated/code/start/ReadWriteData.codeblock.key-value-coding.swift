let realm = try! Realm()

let allDogs = realm.objects(Dog.self)

try! realm.write {
    allDogs.first?.setValue("Sparky", forKey: "name")
    // An international dognapping ring moves all the dogs to Toronto
    allDogs.setValue("Toronto", forKey: "currentCity")
}
