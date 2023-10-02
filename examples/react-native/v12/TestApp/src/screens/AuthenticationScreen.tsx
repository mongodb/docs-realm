import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginExample} from '../components/authentication/login/RealmWrapper';

import {AuthenticationStackParamList} from '../navigation/types';
import {AuthenticationHomeProps} from '../navigation/types';

const Stack = createStackNavigator<AuthenticationStackParamList>();

export const AuthenticationScreen = () => {
  return (
    <Stack.Navigator initialRouteName="AuthenticationHome">
      <Stack.Screen
        name="AuthenticationHome"
        component={AuthenticationHome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginExample} />
    </Stack.Navigator>
  );
};

const AuthenticationHome = ({navigation}: AuthenticationHomeProps) => {
  return (
    <View style={styles.globalScreen}>
      <Text>This is the Login section</Text>
      <View style={styles.exampleList}>
        <View style={styles.loginExample}>
          <Text style={styles.exampleTitle}>Log in</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('Login');
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
  loginExample: {
    maxWidth: '45%',
    minWidth: '35%',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginVertical: 8,
    marginHorizontal: 3,
  },
});
