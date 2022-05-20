let realm = try! Realm()
try! realm.write {
    // Add coffee shop and drink info here.
    let shop = CoffeeShop()
    shop.name = "Better Coffee"
    let drink = CoffeeDrink()
    drink.name = "Maple Latte"
    drink.rating = 7
    shop.drinks.append(drink)
    realm.add(shop)
}
