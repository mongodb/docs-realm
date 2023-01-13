const TraverseCharacterInventory = ({characterName}) => {
  const realm = useRealm();
  const [inventoryItem, setInventoryItem] = useState('');
  const [inventory, setInventory] = useState([]);

  const character = useQuery(Character).filtered(`name = '${characterName}'`)[0];

  const addInventoryItem = () => {
    realm.write(() => {
      character?.inventory.add(inventoryItem);
    });
    setInventory([...inventory, inventoryItem]);
  };

  return (
    <View>
      <Text>{character.name}</Text>
      <Text>Add an item to the inventory:</Text>
      <TextInput onChangeText={text => setInventoryItem(text)} value={inventoryItem} />
      <Button testID='addInventoryItemBtn' title='Add Inventory Item' onPress={addInventoryItem} />

      <Text>Ordered Inventory:</Text>
      {inventory.map(item => (
        <Text testID='inventoryItem'>{item}</Text>
      ))}

      <Text>Unordered Inventory:</Text>
      {character.inventory.map(item => (
        <Text testID='unorderedInventoryItem'>{item}</Text>
      ))}
    </View>
  );
};
