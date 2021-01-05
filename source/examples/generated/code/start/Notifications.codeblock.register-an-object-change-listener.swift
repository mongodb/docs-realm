// Define the dog class.
class NotificationExample_Dog: Object {
    @objc dynamic var name = ""
}

var objectNotificationToken: NotificationToken?

func objectNotificationExample() {
    let dog = NotificationExample_Dog()
    dog.name = "Max"

    // Open the default realm.
    let realm = try! Realm()
    try! realm.write {
        realm.add(dog)
    }
    // Observe object notifications. Keep a strong reference to the notification token
    // or the observation will stop. Invalidate the token when done observing.
    objectNotificationToken = dog.observe { change in
        switch change {
        case .change(let object, let properties):
            for property in properties {
                print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'");
            }
        case .error(let error):
            print("An error occurred: \(error)")
        case .deleted:
            print("The object was deleted.")
        }
    }

    try! realm.write {
        dog.name = "Wolfie"
    }
}