const CreateHomeOwner = () => {
  const [homeOwnerName, setHomeOwnerName] = useState('John Smith');
  const [address, setAddress] = useState('1 Home Street');
  const realm = useRealm();

  const SubmitHomeOwner = () => {
    // Create a HomeOwner within a Write Transaction
    realm.write(() => {
      new HomeOwner(realm, {
        name: homeOwnerName,
        // For the dictionary field, 'home', set it's value to a regular javascript object
        home: {
          address,
        },
      });
    });
  };
  return (
    <View>
      <TextInput value={homeOwnerName} onChangeText={(text: string) => setHomeOwnerName(text)} />
      <TextInput value={address} onChangeText={(text: string) => setAddress(text)} />
      <Button title='Submit Home Owner' onPress={SubmitHomeOwner} />
    </View>
  );
};
