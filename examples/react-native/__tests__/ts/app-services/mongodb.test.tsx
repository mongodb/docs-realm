// :snippet-start: call-function
import React from 'react';
import {useUser} from '@realm/react';
// :remove-start:
import {Credentials, BSON} from 'realm';
import {useEffect, useState} from 'react';
import {App} from 'realm';
import {AppProvider, UserProvider, useApp} from '@realm/react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {View, Button, Text} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <MyApp />
      </AppProvider>
    </View>
  );
}

function MyApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous()).then(async user => {
      if (user) {
        setLoggedIn(true);
        const plants = user.mongoClient('mongodb-atlas').db('example').collection<Plant>('plants');
        try {
          await plants.insertOne({_id: new BSON.ObjectId('5f87976b7b800b285345a8b4'), name: 'venus flytrap', sunlight: 'full', color: 'white', type: 'perennial', _partition: 'Store 42'});
        } catch (err) {
          console.error(err);
        }
      }
    });
  }, []);
  return loggedIn ? (
    <View>
      <UserProvider>
        <Text>Foo!</Text>
        <QueryPlants />
      </UserProvider>
    </View>
  ) : null;
}

let higherScopedVenusFlyTrap: Plant | null;

type Plant = {
  _id: BSON.ObjectId;
  _partition: string;
  name: string;
  sunlight?: string;
  color?: string;
  type?: string;
};
// :remove-end:

function QueryPlants() {
  // Get currently logged in user
  const user = useUser();

  const getPlantByName = async (name: string) => {
    // Access linked MongoDB collection
    const mongodb = user!.mongoClient('mongodb-atlas');
    const plants = mongodb.db('example').collection<Plant>('plants');
    // Query the collection
    const response = await plants.findOne({name});
    higherScopedVenusFlyTrap = response; // :remove:

    return response;
  };
  // ...
  // :remove-start:
  return <Button onPress={() => getPlantByName('venus flytrap')} testID='test-mongodb-call' title='Test Me!' />;
  // :remove-end:
}
// :snippet-end:

afterEach(async () => await App.getApp(APP_ID).currentUser?.logOut());

test('Call Atlas Function', async () => {
  const {getByTestId} = render(<AppWrapper />);

  const button = await waitFor(() => getByTestId('test-mongodb-call'));
  fireEvent.press(button);
  await waitFor(() => expect(higherScopedVenusFlyTrap?.name).toBe('venus flytrap'));
});

// Note: rest of the examples on React Native 'query MongoDB' page can be found
// in the Node.js unit test suite in the file `examples/node/Examples/mongodb.js`.
