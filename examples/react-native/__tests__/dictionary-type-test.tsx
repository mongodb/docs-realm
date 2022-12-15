import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

interface Home extends Realm.Dictionary {
  address?: string;
  color?: string;
  price?: number;
  yearRenovated?: number;
}

class HomeOwner extends Realm.Object<HomeOwner> {
  name!: string;
  home!: Home;

  static schema = {
    name: 'HomeOwner',
    properties: {
      name: 'string',
      home: '{}',
    },
  };
}

const realmConfig = {
  schema: [HomeOwner],
  inMemory: true,
};

const {RealmProvider, useRealm} = createRealmContext(realmConfig);

describe('Dictionary Tests', () => {
  it('should create a dictionary object', async () => {
    console.log('foo');
    const CreateHomeOwner = () => {
      // useState hook to store the homeowner's name and address
      const [name, setName] = useState('');
      const [address, setAddress] = useState('');

      // handler for when the "Save" button is clicked
      const handleSave = () => {
        // create the homeowner object with the name and address
        const homeowner = {
          name: name,
          address: address,
        };

        // save the homeowner object (you could add code here to save the object to a database, etc.)
      };

      return (
        <View>
          <TextInput placeholder='Name' value={name} onChangeText={setName} />
          <TextInput
            placeholder='Address'
            value={address}
            onChangeText={setAddress}
          />
          <Button title='Save' onPress={handleSave} />
        </View>
      );
    };

    const App = () => (
      <RealmProvider>
        <CreateHomeOwner />
      </RealmProvider>
    );
    const {findByPlaceholderText, getByText} = render(<App />);

    // get the name and address input fields
    const nameInput = await findByPlaceholderText('Name');
    const addressInput = await findByPlaceholderText('Address');

    // simulate the user entering a name and address
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(addressInput, '123 Main St');

    // get the "Save" button and click it
    const saveButton = getByText('Save');
    fireEvent.press(saveButton);
  });
});
