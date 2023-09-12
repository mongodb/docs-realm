.. code-block:: typescript

   import React, {useEffect, useState} from 'react';
   import {BSON, WaitForSync} from 'realm';
   import {useRealm, useQuery} from '@realm/react';
   import {View, Text, Button, TextInput, FlatList} from 'react-native';

   import {Bird} from './models/Bird';
   import {Subscription} from 'realm/dist/bundle';
