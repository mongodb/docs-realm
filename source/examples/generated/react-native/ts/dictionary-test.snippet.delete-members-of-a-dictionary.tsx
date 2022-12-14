const HomeInfo = ({homeOwnerName}: {homeOwnerName: string}) => {
  const realm = useRealm();
  const homeOwner = realm
    .objects(HomeOwner)
    .filtered(`name == '${homeOwnerName}'`)[0];

  const deleteExtraHomeInfo = () => {
    realm.write(() => {
      // remove the 'yearRenovated' and 'color' field of the house
      homeOwner.home.remove(['yearRenovated', 'color']);
    });
  };

  return (
    <View>
      <Text>{homeOwner.name}</Text>
      <Text>{homeOwner.home.address}</Text>
      <Button
        onPress={deleteExtraHomeInfo}
        title='Delete extra home info'
       
      />
    </View>
  );
};
