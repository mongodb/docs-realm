realm.write([&] {
    realm.remove(specificPerson);
    realm.remove(specificDog);
});
