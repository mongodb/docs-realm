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
  it('should delete members of a dictionary', async () => {
    // :snippet-start: delete-members-of-a-dictionary
    // :replace-start: {
    //  "terms": {
    //   " testID='deleteExtraHomeInfoBtn'": ""
    //   }
    // }
    const HomeInfo = ({homeOwnerName}) => {
      const realm = useRealm();
      const homeOwner = realm
        .objects(HomeOwner)
        .filtered(`name == '${homeOwnerName}'`)[0];

      const deleteExtraHomeInfo = () => {
        realm.write(() => {
          // remove the 'yearRenovated' and 'color' field of the house
          homeOwner.home.remove(['yearRenovated', 'color']);
        });
      };

      return (
        <View>
          <Text>{homeOwner.name}</Text>
          <Text>{homeOwner.home.address}</Text>
          <Button
            onPress={deleteExtraHomeInfo}
            title='Delete extra home info'
            testID='deleteExtraHomeInfoBtn'
          />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <HomeInfo homeOwnerName='Anna Smith' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    const deleteExtraHomeInfoBtn = await waitFor(() =>
      getByTestId('deleteExtraHomeInfoBtn'),
    );
    // Test that the home owner's home had her 'yearRenovated' & 'color' removed by checking its address and year renovated before and after the deleteExtraHomeInfoBtn has been pressed
    const annaSmithHome = assertionRealm
      .objects(HomeOwner)
      .filtered('name == "Anna Smith"')[0].home;
    expect(annaSmithHome.yearRenovated).toBe(1994);
    expect(annaSmithHome.color).toBe('blue');

    setTimeout(async () => {
      await act(async () => {
        fireEvent.press(deleteExtraHomeInfoBtn);
      });
      expect(annaSmithHome.yearRenovated).toBeUndefined();
      expect(annaSmithHome.color).toBeUndefined();
    }, 3000);
  });
});
