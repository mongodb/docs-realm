/* eslint react/prop-types: 0 */

import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import HomeOwner from '../../Models/HomeOwner';

const realmConfig = {
  schema: [HomeOwner],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm} = createRealmContext(realmConfig);

let assertionRealm: Realm;

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
        realm.write(() => {
          new HomeOwner(realm, {
            name: homeOwnerName,
            home: {
              address,
            },
          });
        });
      };
      return (
        <View>
          <TextInput value={homeOwnerName} onChangeText={(text: string) => setHomeOwnerName(text)} />
          <TextInput value={address} onChangeText={(text: string) => setAddress(text)} />
          <Button title='Submit Home Owner' testID='submitHomeOwnerBtn' onPress={SubmitHomeOwner} />
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
    // press the "Add Dog" button
    const handleAddDogBtn = await waitFor(() => getByTestId('submitHomeOwnerBtn'));
    await act(async () => {
      fireEvent.press(handleAddDogBtn);
    });
    // check if the new HomeOwner object has been created
    const homeOwner = assertionRealm.objects(HomeOwner).filtered("name == 'John Smith'")[0];
    expect(homeOwner.name).toBe('John Smith');
    expect(homeOwner.home.address).toBe('1 Home Street');
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
      const summerHillHouse = homeOwners.filtered('home["address"] = "Summerhill St."')[0].home;

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

    const homeWithAPriceItem = await waitFor(() => getAllByTestId('homeWithAPriceItem'));

    // test that there is only one home with a price that is rendered, and its address is '200 lake street'
    expect(homeWithAPriceItem.length).toBe(1);
    expect(homeWithAPriceItem[0].props.children).toBe('200 lake street');

    const summerHillHouseColor = await waitFor(() => getByTestId('summerHillHouseColor'));
    // test that the summer hill house has rendered properly in the UI by checking its color
    expect(summerHillHouseColor.props.children).toBe('pink');

    const redHouseAddress = await waitFor(() => getByTestId('redHouseAddress'));
    // test that the red house has rendered properly in the UI by checking its address
    expect(redHouseAddress.props.children).toBe('1 washington street');
  });
  it('should update a dictionary', async () => {
    // :snippet-start: update-a-dictionary
    // :replace-start: {
    //  "terms": {
    //   " testID='homeOwnerName'": "",
    //   " testID='updateAddressBtn'": "",
    //   "3 jefferson lane": ""
    //   }
    // }
    const UpdateHome = ({homeOwnerName}: {homeOwnerName: string}) => {
      const [address, setAddress] = useState('3 jefferson lane');
      const realm = useRealm();
      const homeOwner = realm.objects(HomeOwner).filtered(`name == '${homeOwnerName}'`)[0];

      const updateAddress = () => {
        // Update the home object with the new address
        realm.write(() => {
          // use the `set()` method to update a field of a dictionary
          homeOwner.home.set({address});
          // alternatively, update a field of a dictionary through dot notation
          homeOwner.home.yearRenovated = 2004;
        });
      };

      return (
        <View>
          <Text testID='homeOwnerName'>{homeOwner.name}</Text>
          <TextInput value={address} onChangeText={setAddress} placeholder='Enter new address' />
          <Button onPress={updateAddress} title='Update Address' testID='updateAddressBtn' />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <UpdateHome homeOwnerName='Anna Smith' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);
    const homeOwnerName = await waitFor(() => getByTestId('homeOwnerName'));
    // Test that the homeOwner object has been found, by checking that 'Anna Smith' has rendered properly
    expect(homeOwnerName.props.children).toBe('Anna Smith');

    const updateAddressBtn = await waitFor(() => getByTestId('updateAddressBtn'));
    // Test that the home owner's home has been updated by checking its address and year renovated before and after the updateAddressBtn has been pressed
    const annaSmithHome = assertionRealm.objects(HomeOwner).filtered('name == "Anna Smith"')[0].home;
    expect(annaSmithHome.address).toBe('2 jefferson lane');
    expect(annaSmithHome.yearRenovated).toBe(1994);
    await act(async () => {
      fireEvent.press(updateAddressBtn);
    });
    expect(annaSmithHome.address).toBe('3 jefferson lane');
    expect(annaSmithHome.yearRenovated).toBe(2004);
  });
  it('should delete members of a dictionary', async () => {
    // :snippet-start: delete-members-of-a-dictionary
    // :replace-start: {
    //  "terms": {
    //   " testID='deleteExtraHomeInfoBtn'": ""
    //   }
    // }
    const HomeInfo = ({homeOwnerName}: {homeOwnerName: string}) => {
      const realm = useRealm();
      const homeOwner = realm.objects(HomeOwner).filtered(`name == '${homeOwnerName}'`)[0];

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
          <Button onPress={deleteExtraHomeInfo} title='Delete extra home info' testID='deleteExtraHomeInfoBtn' />
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

    const deleteExtraHomeInfoBtn = await waitFor(() => getByTestId('deleteExtraHomeInfoBtn'));
    // Test that the home owner's home had her 'yearRenovated' & 'color' removed by checking its address and year renovated before and after the deleteExtraHomeInfoBtn has been pressed
    const annaSmithHome = assertionRealm.objects(HomeOwner).filtered('name == "Anna Smith"')[0].home;
    expect(annaSmithHome.yearRenovated).toBe(1994);
    expect(annaSmithHome.color).toBe('blue');
    await act(async () => {
      fireEvent.press(deleteExtraHomeInfoBtn);
    });
    expect(annaSmithHome.yearRenovated).toBeUndefined();
    expect(annaSmithHome.color).toBeUndefined();
  });
});
