// :replace-start: {
//   "terms": {
//     "LandingPageExamples_": ""
//   }
// }

import XCTest
import RealmSwift

// MARK: Define an Object Schema

// :code-block-start: coffee-drink-object
class LandingPageExamples_CoffeeDrink: Object {
    @Persisted var name = ""
    @Persisted var hotOrCold: String?
    @Persisted var rating = 0
}
// :code-block-end:

class LandingPageExamples_CoffeeShop: Object {
    // Required string property
    @Persisted var name = ""
    @Persisted var drinks: List<LandingPageExamples_CoffeeDrink>
}

// MARK: Query Realm Database

class LandingPageExamples: XCTestCase {

    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    let realm = try! Realm()

    override func setUp() {
        try! realm.write {
            // Add coffee shop and drink info here.
            let shop = LandingPageExamples_CoffeeShop()
            shop.name = "Better Coffee"
            let drink = LandingPageExamples_CoffeeDrink()
            drink.name = "Maple Latte"
            drink.rating = 7
            shop.drinks.append(drink)
            realm.add(shop)
        }
    }

    func testWriteObject() {
        // :code-block-start: write-an-object
        let realm = try! Realm()
        try! realm.write {
            // Add coffee shop and drink info here.
            let shop = LandingPageExamples_CoffeeShop()
            shop.name = "Better Coffee"
            let drink = LandingPageExamples_CoffeeDrink()
            drink.name = "Maple Latte"
            drink.rating = 7
            shop.drinks.append(drink)
            realm.add(shop)
        }
        // :code-block-end:
    }

    func testQueryCoffeeRatings() {

        // :code-block-start: query
        let realm = try! Realm()

        let drinks = realm.objects(LandingPageExamples_CoffeeDrink.self)

        let highlyRatedDrinks = drinks.filter("rating > 6")
        print("Highly-rated drinks: \(highlyRatedDrinks.count)")

        let mapleOrCaramelLattes = drinks.filter("name IN {'Maple Latte', 'Caramel Latte'}")
        print("Number of maple or caramel lattes: \(mapleOrCaramelLattes.count)")

        let drinkTempNotSpecified = drinks.filter("hotOrCold == nil")
        print("No info about drink temp: \(drinkTempNotSpecified.count)")

        // :code-block-end:
    }

    // MARK: Update Live Objects

    func testUpdateMapleLatte() {
        // :code-block-start: update-live-objects
        let realm = try! Realm()
        // Get a maple latte
        let mapleLatte = realm.objects(LandingPageExamples_CoffeeDrink.self).filter("name == 'Maple Latte'").first!

        // Open a thread-safe transaction
        try! realm.write {
            // Change the name of the maple latte.
            mapleLatte.name = "Maple Delight"
            // Specify that the maple latte is a hot drink.
            mapleLatte.hotOrCold = "Hot"
        } // When the transaction completes, the drink details are updated in the database.
        // :code-block-end:
    }

    // MARK: Watch for Object Updates
    // Note: This example was adapted from "Notifications.swift"
    // and is not really tested, but makes a convenient full-program
    // example.

    // :code-block-start: watch-for-object-updates

    var drinkNotificationToken: NotificationToken?

    func objectNotificationExample() {

        // Create a new drink
        let drink = LandingPageExamples_CoffeeDrink()
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

    // :code-block-end:

    // MARK: Always Access the Latest Data

    func testLiveObjectExample() {

        // :code-block-start: always-access-the-latest-data
        // Open the default realm.
        let realm = try! Realm()

        // Create a couple of references to a single underlying coffee drink object
        let drinkA = realm.objects(LandingPageExamples_CoffeeDrink.self).filter("name == 'Maple Latte'").first!
        let drinkB = realm.objects(LandingPageExamples_CoffeeDrink.self).filter("name == 'Maple Latte'").first!
        // Update drink A's name
        try! realm.write {
            drinkA.name = "Maple-iest Latte in Town"
        }
        // See that drink B instance updates with the new name
        XCTAssert(drinkA.name == drinkB.name)
        // Update drink B's rating
        try! realm.write {
            drinkB.rating = 4
        }
        // See that drink A instance updates with the new rating
        XCTAssert(drinkB.rating == drinkA.rating)
        // :code-block-end:
    }
}
// :replace-end:
