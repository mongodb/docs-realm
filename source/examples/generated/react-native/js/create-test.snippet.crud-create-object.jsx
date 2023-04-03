
const CreateDogInput = () => {
  const [dogName, setDogName] = useState('Fido');
  const realm = useRealm();

  const handleAddDog = () => {
    realm.write(() => {
      realm.create('Dog', {name: dogName, age: 1})
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
