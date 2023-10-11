.. code-block:: typescript

   import React, {useEffect, useState} from 'react';
   import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
   import {Credentials} from 'realm';
   import {
     AppProvider,
     UserProvider,
     useApp,
     useUser,
     useAuth,
     useEmailPasswordAuth,
     AuthOperationName,
   } from '@realm/react';

   // A custom wrapper around <Pressable> for styling
   import {Button} from '../../utility-components/Button';
