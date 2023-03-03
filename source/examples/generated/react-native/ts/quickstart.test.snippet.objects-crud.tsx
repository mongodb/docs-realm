const realm = useRealm();
const profiles = useQuery(Profile);
const activeProfile = useObject(Profile, primaryKey);

const addProfile = (name: string) => {
  realm.write(() => {
    realm.create('Profile', {
      name: name,
      _id: new Realm.BSON.UUID(),
    });
  });
};

const changeProfileName = (newName: string) => {
  realm.write(() => {
    activeProfile!.name = newName;
  });
};

const deleteProfile = () => {
  realm.write(() => {
    realm.delete(activeProfile);
  });
};
