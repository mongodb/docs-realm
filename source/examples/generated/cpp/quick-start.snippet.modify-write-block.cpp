auto todoToUpdate = todosInProgress[0];
realm.write([&realm, &todoToUpdate] {
    todoToUpdate.status = "Complete";
});
