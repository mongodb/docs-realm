let realm = try! Realm()

let allDogs = realm.objects(Dog.self)

try! realm.write {
    allDogs.first?.setValue("Sparky", forKey: "name")
    allDogs.first?.setValue(3, forKey: "age")
}
