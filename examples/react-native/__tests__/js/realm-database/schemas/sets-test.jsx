import React, {useEffect, useState} from 'react';
import {Button, TextInput, View, Text, Alert} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Character from '../../Models/Character';

const realmConfig = {
  schema: [Character],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

let assertionRealm;

// test describe block for the RealmSet schema
describe('Set schema', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(Character));

      new Character(assertionRealm, {
        _id: new Realm.BSON.ObjectId(),
        name: 'PlayerZero',
        levelsCompleted: [1, 2, 3],
        inventory: ['sword', 'shield', 'potion'],
      });
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should create an object with a set', async () => {
    // :snippet-start: create-set-object
    // :replace-start: {
    //  "terms": {
    //   " testID='characterName'": ""
    //   }
    // }
    const CreateInitialCharacters = () => {
      const realm = useRealm();
      useEffect(() => {
        realm.write(() => {
          new Character(realm, {
            _id: new Realm.BSON.ObjectId(),
            name: 'PlayerOne',
            inventory: ['elixir', 'compass', 'glowing shield'],
            levelsCompleted: [4, 9],
          });
        });
        realm.write(() => {
          new Character(realm, {
            _id: new Realm.BSON.ObjectId(),
            name: 'PlayerTwo',
            inventory: ['estus flask', 'gloves', 'rune'],
            levelsCompleted: [1, 2, 5, 24],
          });
        });
      }, []);
      const characters = useQuery(Character);

      return (
        <View>
          {characters.map(character => (
            <View key={character._id}>
              <Text testID='characterName'>{character.name}</Text>
            </View>
          ))}
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <CreateInitialCharacters />
      </RealmProvider>
    );
    const {getAllByTestId} = render(<App />);
    await waitFor(() => {
      expect(getAllByTestId('characterName')[1]).toHaveTextContent('PlayerOne');
      expect(getAllByTestId('characterName')[2]).toHaveTextContent('PlayerTwo');
    });
  });
  it('should add items to a set', async () => {
    // :snippet-start: add-items-to-set
    // :replace-start: {
    //  "terms": {
    //   " testID='inventoryInput'": "",
    //   " testID='addInventoryItemBtn'": ""
    //   }
    // }
    const AddInventoryToCharacter = ({characterName}) => {
      const realm = useRealm();
      const [inventoryItem, setInventoryItem] = useState('');
      const character = useQuery(Character).filtered(`name = '${characterName}'`)[0];

      const addInventoryItem = () => {
        realm.write(() => {
          character?.inventory.add(inventoryItem);
        });
      };

      return (
        <View>
          <TextInput testID='inventoryInput' onChangeText={text => setInventoryItem(text)} value={inventoryItem} />
          <Button testID='addInventoryItemBtn' title='Add Inventory Item' onPress={addInventoryItem} />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <AddInventoryToCharacter characterName='PlayerZero' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    const inventoryInput = await waitFor(() => getByTestId('inventoryInput'), {
      timeout: 5000,
    });
    const addInventoryItemBtn = await waitFor(() => getByTestId('addInventoryItemBtn'), {
      timeout: 5000,
    });
    await act(() => {
      fireEvent.changeText(inventoryInput, 'Cape');
    });
    await act(() => {
      fireEvent.press(addInventoryItemBtn);
    });
    // Test that the cape has been added to the character's inventory
    expect(assertionRealm.objects(Character)[0].inventory.has('Cape')).toBeTruthy();
  });
  it('should check if a set has specific items and check the size of the set', async () => {
    // :snippet-start: check-set-items-and-size
    // :replace-start: {
    //  "terms": {
    //   " testID='inventoryLength'": "",
    //   " testID='inventoryInput'": "",
    //   " testID='addInventoryItemBtn'": ""
    //   }
    // }
    const QueryCharacterInventory = ({characterName}) => {
      const [inventoryItem, setInventoryItem] = useState('');
      const character = useQuery(Character).filtered(`name = '${characterName}'`)[0];

      const queryCharacterInventory = () => {
        const characterDoesHaveItem = character.inventory.has(inventoryItem);
        if (characterDoesHaveItem) {
          Alert.alert(`Character has item: ${inventoryItem}`);
        } else {
          Alert.alert(`Item not found in character's inventory`);
        }
      };
      return (
        <View>
          <Text>{character.name}</Text>
          <Text testID='inventoryLength'>Total number of inventory items: {character.inventory.size}</Text>
          <TextInput testID='inventoryInput' onChangeText={text => setInventoryItem(text)} value={inventoryItem} />
          <Button testID='queryCharacterInventoryBtn' title='Query for Inventory' onPress={queryCharacterInventory} />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <QueryCharacterInventory characterName='PlayerZero' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);
    const inventoryLength = await waitFor(() => getByTestId('inventoryLength'), {
      timeout: 5000,
    });
    // test that PlayerZero has an inventory of length 3
    expect(inventoryLength).toHaveTextContent('Total number of inventory items: 3');

    const inventoryInput = await waitFor(() => getByTestId('inventoryInput'), {
      timeout: 5000,
    });
    const queryCharacterInventoryBtn = await waitFor(() => getByTestId('queryCharacterInventoryBtn'), {
      timeout: 5000,
    });
    // mock the alert function
    jest.spyOn(Alert, 'alert');

    // test that when a user inputs an item that is in the character's inventory, the alert is triggered
    await act(() => {
      fireEvent.changeText(inventoryInput, 'sword');
    });
    await act(() => {
      fireEvent.press(queryCharacterInventoryBtn);
    });

    expect(Alert.alert).toHaveBeenCalledWith('Character has item: sword');
  });
  it('should remove one item from a set and remove all items from the set', async () => {
    // :snippet-start: remove-items-from-set
    // :replace-start: {
    //  "terms": {
    //   " testID='inventoryInput'": "",
    //   " testID='removeInventoryItemBtn'": "",
    //   " testID='removeAllInventoryBtn'": ""
    //   }
    // }
    const RemoveInventoryFromCharacter = ({characterName}) => {
      const realm = useRealm();
      const [inventoryItem, setInventoryItem] = useState('');
      const character = useQuery(Character).filtered(`name = '${characterName}'`)[0];

      const removeInventoryItem = () => {
        realm.write(() => {
          character?.inventory.delete(inventoryItem);
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
          <TextInput testID='inventoryInput' onChangeText={text => setInventoryItem(text)} value={inventoryItem} />
          <Button testID='removeInventoryItemBtn' title='Remove Inventory Item' onPress={removeInventoryItem} />
          <Button testID='removeAllInventoryBtn' title='Remove All Inventory' onPress={removeAllInventory} />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <RemoveInventoryFromCharacter characterName='PlayerZero' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    const inventoryInput = await waitFor(() => getByTestId('inventoryInput'), {
      timeout: 5000,
    });
    const removeInventoryItemBtn = await waitFor(() => getByTestId('removeInventoryItemBtn'), {
      timeout: 5000,
    });
    const removeAllInventoryBtn = await waitFor(() => getByTestId('removeAllInventoryBtn'), {
      timeout: 5000,
    });

    // Test that the sword has been removed from the character's inventory when the removeInventoryItemBtn is pressed
    await act(() => {
      fireEvent.changeText(inventoryInput, 'sword');
    });
    await act(() => {
      fireEvent.press(removeInventoryItemBtn);
    });
    expect(assertionRealm.objects(Character)[0].inventory.has('sword')).toBeFalsy();

    // Test that the character's inventory is empty when the removeAllInventoryBtn is pressed
    await act(() => {
      fireEvent.press(removeAllInventoryBtn);
    });
    expect(assertionRealm.objects(Character)[0].inventory.size).toEqual(0);
  });
});
