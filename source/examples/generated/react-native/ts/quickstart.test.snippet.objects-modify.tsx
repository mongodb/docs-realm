const changeProfileName = (newName: string) => {
  realm.write(() => {
    activeProfile!.name = newName;
  });
};
