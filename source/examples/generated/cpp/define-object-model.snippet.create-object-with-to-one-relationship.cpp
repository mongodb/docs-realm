auto realm = realm::open<Dog, FavoriteToy>();

auto favoriteToy = FavoriteToy { 
    ._id = realm::uuid("68b696c9-320b-4402-a412-d9cee10fc6a5"), 
    .name = "Wubba" };

auto dog = Dog { 
    ._id = realm::uuid("68b696d7-320b-4402-a412-d9cee10fc6a3"), 
    .name = "Lita", 
    .age = 10 };
dog.favoriteToy = favoriteToy;

realm.write([&realm, &dog] {
    realm.add(dog);
});
