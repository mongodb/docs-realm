const QueryCharacterInventory = ({characterName}: {characterName: string}) => {
  const [inventoryItem, setInventoryItem] = useState('');
  const character = useQuery(Character).filtered(`name = '${characterName}'`)[0];

  const queryCharacterInventory = () => {
    const characterDoesHaveItem: Boolean = character.inventory.has(inventoryItem);
    if (characterDoesHaveItem) {
      Alert.alert(`Character has item: ${inventoryItem}`);
    } else {
      Alert.alert(`Item not found in character's inventory`);
    }
  };
  return (
    <View>
      <Text>{character.name}</Text>
      <Text>Total number of inventory items: {character.inventory.size}</Text>
      <TextInput onChangeText={text => setInventoryItem(text)} value={inventoryItem} />
      <Button testID='queryCharacterInventoryBtn' title='Query for Inventory' onPress={queryCharacterInventory} />
    </View>
  );
};
