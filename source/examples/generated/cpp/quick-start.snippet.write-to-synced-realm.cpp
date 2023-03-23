auto todo = Todo {
    .name = "Create a Sync todo item",
    .status = "In Progress",
    .ownerId = userId
};

realm.write([&realm, &todo] {
    realm.add(todo);
});

auto todos = realm.objects<Todo>();
