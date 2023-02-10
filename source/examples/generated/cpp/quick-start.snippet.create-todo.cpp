auto todo = Todo {
    .name = "Create my first todo item",
    .status = "In Progress"
};

realm.write([&realm, &todo] {
    realm.add(todo);
});
