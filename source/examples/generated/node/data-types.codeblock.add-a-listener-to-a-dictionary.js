summerHillHouse.addListener((changedHouse, changes) => {
  console.log(
    `The following changes have occurred in the home: ${JSON.stringify(
      changes,
      null,
      2
    )}`
  );
});
