const CreateHomeOwner = () => {
  const [homeOwnerName, setHomeOwnerName] = useState('John Smith');
  const [address, setAddress] = useState('1 Home Street');
  const realm = useRealm();

  const SubmitHomeOwner = () => {
    realm.write(() => {
      new HomeOwner(realm, {
        name: homeOwnerName,
        home: {
          address,
        },
      });
    });
  };
  return (
    <View>
      <TextInput value={homeOwnerName} onChangeText={text => setHomeOwnerName(text)} />
      <TextInput value={address} onChangeText={text => setAddress(text)} />
      <Button title='Submit Home Owner' onPress={SubmitHomeOwner} />
    </View>
  );
};
