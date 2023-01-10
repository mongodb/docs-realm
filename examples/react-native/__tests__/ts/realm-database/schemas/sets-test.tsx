import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Character from '../../models/Character';

const realmConfig = {
  schema: [Character],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm} = createRealmContext(realmConfig);

let assertionRealm: Realm;

// test describe block for the RealmSet schema
describe('Set schema', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(Character));

      new Character(assertionRealm, {
        _id: new Realm.BSON.ObjectId(),
        name: 'PlayerZero',
        levelsCompleted: [1, 2, 3],
        inventory: ['sword', 'shield', 'potion'],
      });
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should create an object with a set', async () => {
    // :snippet-start: create-set-object
    // :replace-start: {
    //  "terms": {
    //   " testID='catItem'": ""
    //   }
    // }
    const CreateInitialCharacters = () => {
      return (
        <View>
          <Text>ef </Text>
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <CreateInitialCharacters />
      </RealmProvider>
    );
  });
  it('should add items to a set', async () => {});
  it('should check if a set has specific items and check the size of the set', async () => {});
  it('should remove one item from a set and remove all items from the set', async () => {});
});
