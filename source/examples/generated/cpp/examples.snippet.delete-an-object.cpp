realm.write([&realm, &dog] {
    realm.remove(dog);
});
