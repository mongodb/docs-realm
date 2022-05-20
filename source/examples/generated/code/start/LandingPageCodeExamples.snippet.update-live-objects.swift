let realm = try! Realm()
// Get a maple latte
let mapleLatte = realm.objects(CoffeeDrink.self).where {
    $0.name == "Maple Latte"
}.first!

// Open a thread-safe transaction
try! realm.write {
    // Change the name of the maple latte.
    mapleLatte.name = "Maple Delight"
    // Specify that the maple latte is a hot drink.
    mapleLatte.hotOrCold = "Hot"
} // When the transaction completes, the drink details are updated in the database.
