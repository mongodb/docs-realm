// Open the default realm.
let realm = try! Realm()

// Create a couple of references to a single underlying coffee drink object
let drinkA = realm.objects(CoffeeDrink.self).where {
    $0.name == "Maple Latte"
}.first!
let drinkB = realm.objects(CoffeeDrink.self).where {
    $0.name == "Maple Latte"
}.first!
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
