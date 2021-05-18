let characterOne, characterTwo;
realm.write(() => {
  characterOne = realm.create("Character", {
    _id: new BSON.ObjectId(),
    name: "CharacterOne",
    inventory: ["elixir", "compass", "glowing shield"],
    levelsCompleted: [4, 9],
  });
  characterTwo = realm.create("Character", {
    _id: new BSON.ObjectId(),
    name: "CharacterTwo",
    inventory: ["estus flask", "gloves", "rune"],
    levelsCompleted: [1, 2, 5, 24],
  });
});
