auto realm = realm::open<Dog, FavoriteToy>();

auto favoriteToy = FavoriteToy { .name = "Wubba" };
auto dog = Dog { .name = "Lita", .age = 10 };
dog.favoriteToy = favoriteToy;

realm.write([&realm, &dog] {
    realm.add(dog);
});
