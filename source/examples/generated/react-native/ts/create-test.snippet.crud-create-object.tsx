const CreateDogInput = () => {
  const [dogName, setDogName] = useState('Fido');
  const realm = useRealm();

  const handleAddDog = () => {
    realm.write(() => {
      new Dog(realm, {name: dogName, age: 1});
    });
  };

  return (
    <>
      <TextInput onChangeText={setDogName} value={dogName} />
      <Button
        onPress={() => handleAddDog()}
        title='Add Dog'
       
      />
    </>
  );
};
