import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {RealmProvider, useRealm} from '@realm/react';
import {View, Text, FlatList} from 'react-native';

// :snippet-start: model-optional-properties
class Person extends Realm.Object<Person> {
  name!: string;
  age?: number;
  birthday?: Date;

  static schema: ObjectSchema = {
    name: 'Person',
    properties: {
      name: 'string',
      age: {
        type: 'int',
        optional: true, // :emphasize:
      },
      birthday: {
        type: 'date',
        optional: true, // :emphasize:
      },
    },
  };
}
// :snippet-end:

export const ObjectModels = () => {
  return (
    <>
      <RealmProvider schema={[Person]}>
        <ObjectModelList />
      </RealmProvider>
    </>
  );
};

export const ObjectModelList = () => {
  const realm = useRealm();
  const allSchemas = realm.schema;

  if (allSchemas.length) {
    return (
      <FlatList
        data={allSchemas}
        keyExtractor={item => item.name}
        renderItem={ObjectModelItem}
      />
    );
  } else {
    return <Text>No schemas found for this realm.</Text>;
  }
};

type objectModelProps = {name: string};

export const ObjectModelItem = ({item}: {item: objectModelProps}) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};
