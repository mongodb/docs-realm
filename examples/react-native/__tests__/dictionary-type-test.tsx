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
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm} = createRealmContext(realmConfig);

let assertionRealm: Realm;

describe('Create Data Tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects('HomeOwner'));
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should create a new object', async () => {
    // :snippet-start: crud-create-object
    // :replace-start: {
    //  "terms": {
    //   " testID='handleAddDogBtn'": ""
    //   }
    // }
    const CreateDogInput = () => {
      const [dogName, setDogName] = useState('Fido');
      const realm = useRealm();

      const handleAddDog = () => {
        realm.write(() => {
          new HomeOwner(realm, {name: dogName});
        });
      };

      return (
        <>
          <TextInput onChangeText={setDogName} value={dogName} />
          <Button
            onPress={() => handleAddDog()}
            title='Add Dog'
            testID='handleAddDogBtn'
          />
        </>
      );
    };
    // :replace-end:
    // :snippet-end:

    // render an App component, giving the CreateDogInput component access to the @realm/react hooks:
    const App = () => (
      <RealmProvider>
        <CreateDogInput />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    // press the "Add Dog" button
    const handleAddDogBtn = await waitFor(() => getByTestId('handleAddDogBtn'));
    await act(async () => {
      fireEvent.press(handleAddDogBtn);
    });

    // check if the new Dog object has been created
    const myDog = assertionRealm
      .objects(HomeOwner)
      .filtered("name == 'Fido'")[0];
    expect(myDog.name).toBe('Fido');
    // expect(myDog.age).toBe(1);
  });
});
