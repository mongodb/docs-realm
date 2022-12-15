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
  it('should create a new object', async () => {
    // :snippet-start: crud-create-object
    // :replace-start: {
    //  "terms": {
    //   " testID='handleAddDogBtn'": ""
    //   }
    // }
    const CreateHomeOwnerInput = () => {
      const [name, setName] = useState('Fido');
      const realm = useRealm();

      const handleAddObj = () => {
        realm.write(() => {
          new HomeOwner(realm, {name: name});
        });
      };

      return (
        <>
          <TextInput onChangeText={setName} value={name} />
          <Button
            onPress={() => handleAddObj()}
            title='Add Name'
            testID='handleAddObjBtn'
          />
        </>
      );
    };
    // :replace-end:
    // :snippet-end:

    // render an App component, giving the CreateDogInput component access to the @realm/react hooks:
    const App = () => (
      <RealmProvider>
        <CreateHomeOwnerInput />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    // press the "Add Name" button
    const handleAddObjBtn = await waitFor(() => getByTestId('handleAddObjBtn'));
    await act(async () => {
      fireEvent.press(handleAddObjBtn);
    });
  });
});
