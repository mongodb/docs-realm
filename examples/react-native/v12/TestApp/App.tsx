import React from 'react';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeScreen} from './src/screens/HomeScreen';
import {Geospatial} from './src/components/data-types/Geospatial';
import {Logger} from './src/components/Logger';
import {ObjectModels} from './src/components/ObjectModels';

import {RootStackParamList} from './src/navigation/types';

const Drawer = createDrawerNavigator<RootStackParamList>();

/* 
// Each screen has its own RealmProvider and realm. However, they all point to
// the default path. This means you'll get an error when you try to navigate
// from one screen to another because the components are trying to open an
// existing realm with different configurations.
//
// Currently, this is the best approach. We could create different realms with
// `createRealmContext`, but that would somewhat abstract things from the
// desired developer experience of importing RealmProvider directly from
// `@realm/react`.
*/

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Geospatial" component={Geospatial} />
        <Drawer.Screen name="Logger" component={Logger} />
        <Drawer.Screen name="ObjectModels" component={ObjectModels} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
