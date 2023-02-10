realm.write([&realm, &todo] {
    realm.remove(todo);
});
