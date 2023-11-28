const CreateProfileInput = () => {
  const realm = useRealm();
  const [name, setName] = useState('');

  // createProfile creates a new 'UuidProfile' Realm Object with a new UUID based on user input
  const createProfile = () => {
    realm.write(() => {
      realm.create('UuidProfile', {
        name,
        _id: new Realm.BSON.UUID(),
      });
    });
  };
  return (
    <View>
      <TextInput
        placeholder='Name'
        onChangeText={setName}
      />
      <Button
        title='Create Profile'
        onPress={createProfile}
      />
    </View>
  );
