import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {SubscribeApiExamples} from '../components/subscribe-api/RealmWrapper'; //
import { AppWrapperSync } from '../components/quickstart/RealmWrapperSync';

import {QuickStartStackParamList} from '../navigation/types';
import {QuickStartHomeProps} from '../navigation/types';
import { QuickStartLocal } from '../components/quickstart/RealmWrapperLocal';

const Stack = createStackNavigator<QuickStartStackParamList>();

export const QuickStartScreen = () => {
  return (
    <Stack.Navigator initialRouteName="QuickStartHome">
      <Stack.Screen
        name="QuickStartHome"
        component={QuickStartHome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="QuickStartSync" component={AppWrapperSync} />
      <Stack.Screen name="QuickStartLocal" component={QuickStartLocal} />
    </Stack.Navigator>
  );
};

const QuickStartHome = ({navigation}: QuickStartHomeProps) => {
  return (
    <View style={styles.globalScreen}>
      <Text>This is the Quick Start section</Text>
      <View style={styles.exampleList}>
        <View style={styles.subscriptionExample}>
          <Text style={styles.exampleTitle}>Quick Start Sync</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('QuickStartSync');
            }}
          />
        </View>
        <View style={styles.subscriptionExample}>
          <Text style={styles.exampleTitle}>Quick Start Local</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('QuickStartLocal');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalScreen: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  exampleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  exampleTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  subscriptionExample: {
    maxWidth: '45%',
    minWidth: '35%',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginVertical: 8,
    marginHorizontal: 3,
  },
});
