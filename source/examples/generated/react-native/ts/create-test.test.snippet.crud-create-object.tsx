const CreatePersonInput = () => {
  const [name, setName] = useState('Jane');
  const realm = useRealm();

  const handleAddPerson = () => {
    realm.write(() => {
      realm.create('Person', {_id: PERSON_ID, name: name, age: 25});
    });
  };

  return (
    <>
      <TextInput onChangeText={setName} value={name} />
      <Text>{testPerson ? testPerson.name : "no Person"}</Text> {/* :remove */}
      <Button
        onPress={() => handleAddPerson()}
        title='Add Person'
      />
    </>
  );
};
