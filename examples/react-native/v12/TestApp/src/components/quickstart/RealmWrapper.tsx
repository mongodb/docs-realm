import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {Profile} from '../../models'
import {RealmProvider, createRealmContext} from '@realm/react';
import { RestOfApp } from './v12-quickstart.test';
// :snippet-end:

// Create a configuration object
  
  function AppWrapper() {
    return (
      <RealmProvider schema={[Profile]}> 
        <RestOfApp />
      </RealmProvider>
    );
  }
  // :snippet-end: