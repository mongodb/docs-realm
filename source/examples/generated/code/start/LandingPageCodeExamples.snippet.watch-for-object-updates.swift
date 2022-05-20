
var drinkNotificationToken: NotificationToken?

func objectNotificationExample() {

    // Create a new drink
    let drink = CoffeeDrink()
    drink.name = "Spicy Icy Coffee"
    drink.rating = 9

    // Open the default realm.
    let realm = try! Realm()
    try! realm.write {
        // Add the drink to the realm
        realm.add(drink)
    }
    // Observe changes.
    drinkNotificationToken = drink.observe { change in
        switch change {
        case .change(let object, let properties):
            for property in properties {
                print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
            }
        case .error(let error):
            print("An error occurred: \(error)")
        case .deleted:
            print("The object was deleted.")
        }
    }

    // Now, when you update the object, this triggers the notification
    try! realm.write {
        drink.name = "Ancho Chili Chocolate Iced Coffee"
    }
}

