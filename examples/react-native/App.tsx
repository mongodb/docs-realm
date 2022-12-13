/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import useCounter from './src/useCounter'

const App = () => {
  console.log(useCounter())
  const { count, increment, decrement } = useCounter();

  return (
    <SafeAreaView style={styles.viewWrapper}>
      <Text style={styles.counter}>Count: {count}</Text>
      <Button onPress={increment} title="Increment" />
      <Button onPress={decrement} title="Increment" />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    // alignContent: 'center',
    // justifyContent: 'center',
    // textAlign: 'center'
  },
  counter: {
    marginTop: 10,
    textAlign: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
