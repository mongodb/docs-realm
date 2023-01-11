let realm = try! Realm()

let drinks = realm.objects(CoffeeDrink.self)

let highlyRatedDrinks = drinks.where {
    $0.rating > 6
}
print("Highly-rated drinks: \(highlyRatedDrinks.count)")

let mapleOrCaramelLattes = drinks.where {
    $0.name == "Maple Latte" || $0.name == "Caramel Latte"
}
print("Number of maple or caramel lattes: \(mapleOrCaramelLattes.count)")

let drinkTempNotSpecified = drinks.where {
    $0.hotOrCold == nil
}
print("No info about drink temp: \(drinkTempNotSpecified.count)")

