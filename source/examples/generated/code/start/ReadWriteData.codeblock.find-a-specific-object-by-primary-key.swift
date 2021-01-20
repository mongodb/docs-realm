let realm = try! Realm()

let specificDogOwner = realm.object(ofType: DogOwner.self, forPrimaryKey: 12345)
