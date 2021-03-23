let realm = try! Realm()

let drinks = realm.objects(CoffeeDrink.self)

let wellRatedDrinks = drinks.filter("rating > 6")
print("Well-rated drinks: \(wellRatedDrinks.count)")

let mapleOrCaramelLattes = drinks.filter("name IN {'Maple Latte', 'Caramel Latte'}")
print("Number of maple or caramel lattes: \(mapleOrCaramelLattes.count)")

let drinkTempNotSpecified = drinks.filter("hotOrCold == nil")
print("No info about drink temp: \(drinkTempNotSpecified.count)")

