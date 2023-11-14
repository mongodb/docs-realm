import React from 'react';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Components
import {HomeScreen} from './src/screens/HomeScreen';
import {Geospatial} from './src/components/data-types/geospatial/Geospatial';
import {FtsQuery} from './src/components/fts-query/FtsQuery';
import {Logger} from './src/components/logger/Logger';
import {ObjectModels} from './src/components/object-models/ObjectModels';
import {RelationshipExamples} from './src/components/relationships/RealmWrapper';
import {CompensatingWriteErrorHandling} from './src/components/errors/CompensatingWriteWrapper';

// Screens
import {SubscriptionScreen} from './src/screens/SubscriptionScreen';
import { QuickStartScreen } from './src/screens/QuickStartScreen';

// Types
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
        <Drawer.Screen name="FullTextSearch" component={FtsQuery} />
        <Drawer.Screen name="Logger" component={Logger} />
        <Drawer.Screen name="ObjectModels" component={ObjectModels} />
        <Drawer.Screen name="Subscriptions" component={SubscriptionScreen} />
        <Drawer.Screen name="Relationships" component={RelationshipExamples} />
        <Drawer.Screen name="Errors" component={CompensatingWriteErrorHandling} />
        <Drawer.Screen name="QuickStart" component={QuickStartScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
