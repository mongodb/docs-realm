const changeProfileName = (newName) => {
  realm.write(() => {
    activeProfile.name = newName;
  });
};
