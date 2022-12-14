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
    await act(async () => {
      fireEvent.press(submitHomeOwnerBtn);
    });
    setTimeout(() => {
      const homeOwner = assertionRealm
        .objects(HomeOwner)
        .filtered("name == 'John Smith'")[0];

      // check if the new HomeOwner object has been created
      expect(homeOwner.name).toBe('John Smith');
      expect(homeOwner.home.address).toBe('1 Home Street');
    }, 3000);
  });
  it('should query for objects with a dictionary property', async () => {
    // :snippet-start: query-objects-with-dictionary
    // :replace-start: {
    //  "terms": {
    //   " testID='homeItem'": "",
    //   " testID='homeWithAPriceItem'": "",
    //   " testID='summerHillHouseColor'": "",
    //   " testID='redHouseAddress'": ""
    //   }
    // }
    const HomeList = () => {
      const realm = useRealm();
      // query for all HomeOwner objects
      const homeOwners = realm.objects(HomeOwner);

      // run the `.filtered()` method on all the returned homeOwners to
      // find all homeOwners that have a house with a listed price
      const listedPriceHomes = homeOwners.filtered('home.@keys = "price"');

      // run the `.filtered()` method on all the returned homeOwners to
      // find the house with the address "Summerhill St."
      const summerHillHouse = homeOwners.filtered(
        'home["address"] = "Summerhill St."',
      )[0].home;

      // run the `.filtered()` method on all the returned homeOwners to
      // find the first house that has any field with a value of 'red'
      const redHouse = homeOwners.filtered('home.@values = "red"')[0].home;
      return (
        <View>
          <Text>All homes:</Text>
          {homeOwners.map(homeOwner => (
            <View>
              <Text testID='homeItem'>{homeOwner.home.address}</Text>
            </View>
          ))}

          <Text>All homes with a price:</Text>
          {listedPriceHomes.map(homeOwner => (
            <View>
              <Text testID='homeWithAPriceItem'>{homeOwner.home.address}</Text>
              <Text>{homeOwner.home.price}</Text>
            </View>
          ))}

          <Text>Summer Hill House:</Text>
          <Text>{summerHillHouse.address}</Text>
          <Text testID='summerHillHouseColor'>{summerHillHouse.color}</Text>

          <Text>Red House:</Text>
          <Text testID='redHouseAddress'>{redHouse.address}</Text>
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <HomeList />
      </RealmProvider>
    );
    const {getByTestId, getAllByTestId} = render(<App />);

    const homeItem = await waitFor(() => getAllByTestId('homeItem'));
    // test that 4 home items are rendered, since there are 4 HomeOwner realm objects
    expect(homeItem.length).toBe(4);

    const homeWithAPriceItem = await waitFor(() =>
      getAllByTestId('homeWithAPriceItem'),
    );

    // test that there is only one home with a price that is rendered, and its address is '200 lake street'
    expect(homeWithAPriceItem.length).toBe(1);
    expect(homeWithAPriceItem[0].props.children).toBe('200 lake street');

    const summerHillHouseColor = await waitFor(() =>
      getByTestId('summerHillHouseColor'),
    );
    // test that the summer hill house has rendered properly in the UI by checking its color
    expect(summerHillHouseColor.props.children).toBe('pink');

    const redHouseAddress = await waitFor(() => getByTestId('redHouseAddress'));
    // test that the red house has rendered properly in the UI by checking its address
    expect(redHouseAddress.props.children).toBe('1 washington street');
  });
});
