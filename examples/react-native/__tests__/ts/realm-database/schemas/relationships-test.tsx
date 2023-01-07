import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import PetOwner from '../../Models/PetOwner';
import Pet from '../../Models/Pet';
import User from '../../Models/User';
import Post from '../../Models/Post';
import Customer from '../../Models/Customer';
import Order from '../../Models/Order';

const realmConfig = {
  schema: [User, Post],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm} = createRealmContext(realmConfig);

let assertionRealm: Realm;

// test describe block for the relationship page
describe('relationships tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(User));
      assertionRealm.delete(assertionRealm.objects(Post));
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should dynamically obtain an inverse relationship', async () => {
    // :snippet-start: create-to-one-relationship-object
    // :replace-start: {
    //  "terms": {
    //   " testID='nameInput'": "",
    //   " testID='createProfileButton'": ""
    //   }
    // }
    const PostItem = () => {
        const realm = useRealm();
    });
    // :replace-end:
    // :snippet-end:
  });
});
