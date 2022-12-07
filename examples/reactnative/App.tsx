/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useMemo } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import CreateItem from './src/CreateItem';
import ItemList from './src/ItemList';

import { styles } from './src/stylesheet'

import ItemContext, { Item } from "./src/Item";
const { useRealm, useQuery, useObject, RealmProvider } = ItemContext;

const App = () => {

  const realm = useRealm();
  const result = useQuery(Item);
  const items = useMemo(() => result.sorted("createdAt"), [result]);

  // console.log(realm.path)

  const getAllItems = () => {
    const items = realm.objects("Item");
    for(item of items){
      console.log(item.description)
    }
    console.log("item length: ", items.length);
  }


  const handleAddItem = useCallback(
    (description) => {
      if (!description) {
        return;
      }
      realm.write(() => {
        realm.create("Item", Item.generate(description));
      });
    },
    [realm],
  );

  getAllItems()

  return (
    <SafeAreaView>
      <CreateItem handleAddItem={handleAddItem} />
      <Text>   ---------------------------------------------------------</Text>
      <ItemList/>
    </SafeAreaView>
  );
};

function AppWrapper() {
  return (
    <RealmProvider><App /></RealmProvider>
  )
}


export default AppWrapper;
