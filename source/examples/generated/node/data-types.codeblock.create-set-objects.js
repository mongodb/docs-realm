let link, hunter;
realm.write(() => {
  link = realm.create("Character", {
    _id: new BSON.ObjectId(),
    name: "Link",
    inventory: ["elixir", "compass", "glowing shield"],
    levelsCompleted: [4, 9],
  });
  hunter = realm.create("Character", {
    _id: new BSON.ObjectId(),
    name: "Hunter",
    inventory: ["estus flask", "gloves", "rune"],
    levelsCompleted: [1, 2, 5, 24],
  });
});
