import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-get-random-values';

import {HomeScreen} from './src/screens/HomeScreen';
import {Geospatial} from './src/components/data-types/Geospatial';
import {Logger} from './src/components/Logger';

const Drawer = createDrawerNavigator();

/* 
   TODO: Each screen will have its own RealmProvider. How to address multiple
   realms in an app like this? @react-navigation doesn't unmount components
   on navigation, so realms at the default path will conflict, as each
   component will likely need different schemas and configuration.
   Couldn't find a good way to force an unmount on navigation.
   Could potentially set each component's realm at a different path and then
   use Bluehawk :replace: to strip the path for examples.

   Also, how can we manually close realms in React Native? Perhaps figuring that
   out would solve the problem.
*/

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Geospatial" component={Geospatial} />
        <Drawer.Screen name="Logger" component={Logger} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
