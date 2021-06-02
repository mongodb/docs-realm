// check if the characterTwo has completed level 3 by calling the `Realm.Set.has()` method
const characterTwoHasCompletedLevelThree = characterTwo.levelsCompleted.has(3);
console.log(
  `Is level three completed by the characterTwo: ${characterTwoHasCompletedLevelThree}`
);
