let realm = try! Realm()

let users = realm.objects(User.self)

// Get specific user by ObjectId id
let specificUser = users.where {
    $0.id == ObjectId("11223344556677889900aabb")
}

// WRONG: Realm will not convert the string to an object id
// users.where { $0.id == "11223344556677889900aabb" } // not ok
