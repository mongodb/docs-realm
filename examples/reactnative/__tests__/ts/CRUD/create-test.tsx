import React, {useState} from 'react';
import {Button, TextInput} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Dog from '../models/Dog';
import Person from '../models/Person';

const realmConfig = {
  schema: [Dog, Person],
};

const {RealmProvider, useRealm} = createRealmContext(realmConfig);

let assertionRealm: Realm;

describe('Create Data Tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects('Dog'));
      assertionRealm.delete(assertionRealm.objects('Person'));
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
    //   " testID='handleAddItemBtn'": ""
    //   }
    // }
    const CreateDogInput = () => {
      const [dogName, onChangeDogName] = useState('Fido');
      const realm = useRealm();

      const handleAddItem = () => {
        realm.write(() => {
          new Dog(realm, {name: dogName, age: 1});
        });
      };

      return (
        <>
          <TextInput onChangeText={onChangeDogName} value={dogName} />
          <Button
            onPress={() => handleAddItem()}
            title='Submit Item'
            testID='handleAddItemBtn'
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

    // press the "Submit Item" button
    const handleAddItemBtn = await waitFor(() =>
      getByTestId('handleAddItemBtn'),
    );
    await act(async () => {
      fireEvent.press(handleAddItemBtn);
    });

    // check if the new Dog object has been created
    const myDog = assertionRealm.objects(Dog).filtered("name == 'Fido'")[0];
    expect(myDog.name).toBe('Fido');
    expect(myDog.age).toBe(1);
  });
});
