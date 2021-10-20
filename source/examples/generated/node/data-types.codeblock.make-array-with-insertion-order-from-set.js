let levelsCompletedInOrder = [];
async function onCharacterChange(character, changes) {
  if (
    !changes.deleted &&
    changes.changedProperties?.includes("levelsCompleted")
  ) {
    for (let level of character["levelsCompleted"]) {
      if (!levelsCompletedInOrder.includes(level)) {
        levelsCompletedInOrder.push(level);
      }
    }
  }
}

let playerOne, realm;
try {
  realm = await Realm.open({
    schema: [characterSchema],
  });

  await realm.write(() => {
    playerOne = realm.create("Character", {
      _id: new BSON.ObjectId(),
      name: "PlayerOne",
      inventory: ["potion", "wand", "spell book"],
      levelsCompleted: [],
    });
  });
  playerOne.addListener(onCharacterChange);

  await realm.write(() => {
    playerOne.levelsCompleted.add(5);
  });
  await realm.write(() => {
    playerOne.levelsCompleted.add(12);
  });
  await realm.write(() => {
    playerOne.levelsCompleted.add(2);
  });

  console.log("set ordered", Array.from(playerOne.levelsCompleted)); // not necessarily [5, 12, 1]
  console.log("insert ordered", levelsCompletedInOrder); // [5, 12, 1]
} catch (err) {
  console.error(err);
} finally {
  // close the realm
  realm.close();
}
