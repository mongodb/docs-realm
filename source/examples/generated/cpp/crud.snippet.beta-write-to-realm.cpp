realm.write([&] {
    realm.add(std::move(person));
});
