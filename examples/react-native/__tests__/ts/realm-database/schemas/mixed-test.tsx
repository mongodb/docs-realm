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

      new Cat(assertionRealm, {
        name: 'Clover',
        birthDate: new Date('January 21, 2016'),
      });
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

        console.log('use effect ran?');
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

    // Test that 5 Cat Items have been added to the UI, and 5 matching Cat objects have been created in the assertionRealm (since there was already 1 cat object 'clover' created in the beforeEach) + the 4 new Cats
    setTimeout(() => {
      expect(catItems.length).toBe(5);
      const cats = assertionRealm.objects(Cat);
      expect(cats.length).toBe(5);
    }, 3000);
  });
  it('should query for objects with a mixed value', async () => {
    const CatInfoCard = ({catName}: {catName: string}) => {
      // To query for the cat's birthDate, filter for their name to retrieve the realm object.
      // Use dot notation to access the birthDate property.
      const cat = useQuery(Cat).filtered(`name = '${catName}'`)[0];
      const catBirthDate = cat.birthDate;

      if (cat) {
        return (
          <>
            <Text>{catName}</Text>
            <Text testID='catBirthDate'>{String(catBirthDate)}</Text>
          </>
        );
      } else {
        return <Text>Cat not found</Text>;
      }
    };
    const App = () => (
      <RealmProvider>
        <CatInfoCard catName='Clover' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);
    const catBirthDate = await waitFor(() => getByTestId('catBirthDate'));
    // Expect catBirthDate in the UI to be the same value we set in the beforeEach (which is clover's birthday 'January 21, 2016')
    expect(new Date(catBirthDate.props.children)).toStrictEqual(
      new Date('January 21, 2016'),
    );
  });
});
