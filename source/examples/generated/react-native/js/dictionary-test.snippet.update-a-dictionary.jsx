const UpdateHome = ({homeOwnerName}) => {
  const [address, setAddress] = useState('');
  const realm = useRealm();
  const homeOwner = realm
    .objects(HomeOwner)
    .filtered(`name == '${homeOwnerName}'`)[0];

  const updateAddress = () => {
    // Update the home object with the new address
    realm.write(() => {
      // use the `set()` method to update a field of a dictionary
      homeOwner.home.set({address: '3 jefferson lane'});
      // alternatively, update a field of a dictionary through dot notation
      homeOwner.home.yearRenovated = 2004;
    });
  };

  return (
    <View>
      <Text>{homeOwner.name}</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder='Enter new address'
      />
      <Button
        onPress={updateAddress}
        title='Update Address'
       
      />
    </View>
  );
};
