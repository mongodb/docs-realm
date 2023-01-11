const RemoveInventoryFromCharacter = ({characterName}: {characterName: string}) => {
  const [input, setInput] = useState('');
  const realm = useRealm();
  const character = useQuery(Character).filtered(`name = '${characterName}'`)[0];

  const removeInventoryItem = () => {
    realm.write(() => {
      character?.inventory.delete(input);
    });
  };
  const removeAllInventory = () => {
    realm.write(() => {
      character?.inventory.clear();
    });
  };
  return (
    <View>
      <Text>{character.name}</Text>
      <TextInput onChangeText={text => setInput(text)} value={input} />
      <Button title='Remove Inventory Item' onPress={removeInventoryItem} />
      <Button title='Remove All Inventory' onPress={removeAllInventory} />
    </View>
  );
};
