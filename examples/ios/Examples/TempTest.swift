import XCTest
import RealmSwift

class TempExample_CoffeeDrink: Object {
    @Persisted var name = ""
    @Persisted var rating = 0
    @Persisted var containsDairy = false
    @Persisted var source = ""
}

class TempTestCase: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testExample() {
        // This is a temp test just to confirm the updated CI workflow
        // runs and works as expected. I'll delete it when I work on the
        // next ticket after merging.
        let coffeeDrink = TempExample_CoffeeDrink()
        coffeeDrink.name = "Coffee"
        coffeeDrink.rating = 10
        coffeeDrink.containsDairy = true
        coffeeDrink.source = "AeroPress in my kitchen"

        let realm = try! Realm()

        try! realm.write {
            realm.add(coffeeDrink)
        }

        let coffeeDrinks = realm.objects(TempExample_CoffeeDrink.self)
        XCTAssertEqual(coffeeDrinks.count, 1)
    }
}
