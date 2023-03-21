import React from 'react';
import {Realm, createRealmContext} from '@realm/react';
import {FlatList, View} from 'react-native';
import Cat from '../Models/Cat';


const {RealmProvider, useQuery} = createRealmContext({
  schema: [Cat.schema],
  path: 'bundle.realm',
});

export default function App() {
  return (
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}

// Can access objects from the bundled realm
function RestOfApp() {
  const cats = useQuery<Cat>('Cat');

  return (
    <FlatList
      data={cats}
      renderItem={({item}) => <View>{item.name}</View>}
      keyExtractor={item => item.name}
    />
  );
}
