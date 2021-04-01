let realm = try! Realm()

let users = realm.objects(User.self)

// Get specific user by ObjectId id
let specificUser = users.filter("id = %@", ObjectId("11223344556677889900aabb")).first

// WRONG: Realm will not convert the string to an object id
// users.filter("id = '11223344556677889900aabb'") // not ok
// users.filter("id = %@", "11223344556677889900aabb") // not ok
