import React, {useEffect, useState} from 'react';
import {Button, TextInput, Text, View} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Cat from '../../models/Cat';

const realmConfig = {
  schema: [Cat],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

let assertionRealm: Realm;

describe('Mixed Tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(Cat));
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should create an object with a mixed value', async () => {
    const CreateCatsInput = () => {
      const realm = useRealm();

      useEffect(() => {
        realm.write(() => {
          // create a Dog with a birthDate value of type string
          new Cat(realm, {
            name: 'Euler',
            birthDate: 'December 25th, 2017',
          });
          // create a Dog with a birthDate value of type date
          new Cat(realm, {
            name: 'Blaise',
            birthDate: new Date('August 17, 2020'),
          });

          // create a Dog with a birthDate value of type int
          new Cat(realm, {name: 'Euclid', birthDate: 10152021});

          // create a Dog with a birthDate value of type null
          new Cat(realm, {name: 'Pythagoras', birthDate: null});
        });
      }, [realm]);

      const cats = useQuery(Cat);

      return (
        <>
          {cats.map(cat => (
            <View testID='catItem'>
              <Text>{cat.name}</Text>
              <Text>{String(cat.birthDate)}</Text>
            </View>
          ))}
        </>
      );
    };

    const App = () => (
      <RealmProvider>
        <CreateCatsInput />
      </RealmProvider>
    );

    const {getAllByTestId} = render(<App />);

    const catItems = await waitFor(() => getAllByTestId('catItem'));

    // Test that 4 Cat Items have been added to the UI, and 4 matching Cat objects have been created in the realm
    expect(catItems.length).toBe(4);
    const cats = assertionRealm.objects(Cat);
    expect(cats.length).toBe(4);
  });
});
