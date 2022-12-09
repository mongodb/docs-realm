const DogList = () => {
  const realm = useRealm();
  const myDogs = useQuery(Dog);

  const deleteAllYoungDogObjects = () => {
    const youngDogs = myDogs.filtered('age < 3');
    realm.write(() => {
      realm.delete(youngDogs);
    });
  };
  const deleteAllDogObjects = () => {
    realm.write(() => {
      realm.delete(myDogs);
    });
  };
  return (
    <>
      {myDogs.map(dog => {
        return (
          <>
            <Text testID="dogItem">{dog.name}</Text>
            <Text>{dog.age}</Text>
          </>
        );
      })}
      <Button
        onPress={() => deleteAllYoungDogObjects()}
        title="Delete Young Dog Objects"
        testID="deleteYoungDogs"
      />
      <Button
        onPress={() => deleteAllDogObjects()}
        title="Delete All Dog Objects"
        testID="deleteAllDogs"
      />
    </>
  );
};
