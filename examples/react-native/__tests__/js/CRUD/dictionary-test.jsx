import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

class HomeOwner extends Realm.Object {
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

let assertionRealm;

describe('Dictionary Tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);
    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(HomeOwner));

      new HomeOwner(assertionRealm, {
        name: 'Martin Doe',
        home: {address: 'Summerhill St.', color: 'pink'},
      });
      new HomeOwner(assertionRealm, {
        name: 'Tony Henry',
        home: {address: '200 lake street', price: 123000},
      });
      new HomeOwner(assertionRealm, {
        name: 'Rob Johnson',
        home: {address: '1 washington street', color: 'red'},
      });
      new HomeOwner(assertionRealm, {
        name: 'Anna Smith',
        home: {address: '2 jefferson lane', yearRenovated: 1994, color: 'blue'},
      });
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should create an object with a dictionary value', async () => {
    // :snippet-start: create-object-with-dictionary-value
    // :replace-start: {
    //  "terms": {
    //   " testID='submitHomeOwnerBtn'": ""
    //   }
    // }
    const CreateHomeOwner = () => {
      const [homeOwnerName, setHomeOwnerName] = useState('John Smith');
      const [address, setAddress] = useState('1 Home Street');
      const realm = useRealm();

      const SubmitHomeOwner = () => {
        // Create a HomeOwner within a Write Transaction
        realm.write(() => {
          new HomeOwner(realm, {
            name: homeOwnerName,
            // For the dictionary field, 'home', set the value to a regular javascript object
            home: {
              address,
            },
          });
        });
      };
      return (
        <View>
          <Button
            title='Submit Home Owner'
            testID='submitHomeOwnerBtn'
            onPress={() => SubmitHomeOwner()}
          />
          <TextInput
            value={homeOwnerName}
            onChangeText={text => setHomeOwnerName(text)}
          />
          <TextInput value={address} onChangeText={text => setAddress(text)} />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <CreateHomeOwner />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);
    const submitHomeOwnerBtn = await waitFor(() =>
      getByTestId('submitHomeOwnerBtn'),
    );
    // await act(async () => {
    //   fireEvent.press(submitHomeOwnerBtn);
    // });
    // // check if the new HomeOwner object has been created
    // const homeOwner = assertionRealm
    //   .objects(HomeOwner)
    //   .filtered("name == 'John Smith'")[0];
    // expect(homeOwner.name).toBe('John Smith');
    // expect(homeOwner.home.address).toBe('1 Home Street');
  });
});
