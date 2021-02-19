// A dog has an _id primary key, a string name, an optional
// string breed, and a date of birth.
class Dog: Object {
    @objc dynamic var _id = ObjectId.generate()
    @objc dynamic var name = ""
    @objc dynamic var breed: String?
    @objc dynamic var dateOfBirth = Date()

    override static func primaryKey() -> String? {
        return "_id"
    }
}
