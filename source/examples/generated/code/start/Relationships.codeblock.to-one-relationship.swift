class ToOneRelationship_Person: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var birthdate: Date = Date(timeIntervalSince1970: 1)
    
    // A person can have one dog
    @objc dynamic var dog: ToOneRelationship_Dog? = nil
}

class ToOneRelationship_Dog: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var age: Int = 0
    @objc dynamic var breed: String? = nil
    // No backlink to person -- one-directional relationship
}