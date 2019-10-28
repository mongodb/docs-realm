dog.addListener((obj, changes) => {
  // obj === dog
  console.log(`object is deleted: ${changes.deleted}`);
  console.log(`${changes.changedProperties.length} properties have been changed:`);
  changes.changedProperties.forEach(prop => {
      console.log(` ${prop}`);
    });
});
