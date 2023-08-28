import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeScreen} from './src/screens/HomeScreen';
import {Geospatial} from './src/components/data-types/Geospatial';

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Geospatial" component={Geospatial} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
