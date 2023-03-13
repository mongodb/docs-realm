const deleteProfile = () => {
  realm.write(() => {
    realm.delete(activeProfile);
  });
};
