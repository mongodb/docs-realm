import React, {useState} from 'react';
import Realm, {ObjectSchema, BSON} from 'realm';
import {RealmProvider, useQuery, useRealm} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';

class Turtle extends Realm.Object<Turtle> {
  _id!: BSON.ObjectId;
  name!: string;
  birthday?: string;

  static schema: ObjectSchema = {
    name: 'Turtle',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthday: 'string?',
    },
    primaryKey: '_id',
  };
}

type LogProps = {level: string; message: string};

const LogItem = ({level, message}: LogProps) => (
  <View>
    <Text>{level}</Text>
    <Text>{message}</Text>
  </View>
);

type Log = {
  message: string;
  level: string;
};

export const Logger = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  // Can't set logger in useEffect at same level as `RealmProvider` because
  // useEffect runs afer `componentDidMount`. This means that `RealmProvider`
  // has already opened a realm and the `setLogger` callback needs to be
  // set up before the realm is opened.

  Realm.setLogger((level, message) => {
    const log = {
      message,
      level,
    };

    console.debug('writing log: ', log);

    setLogs(previousLogs => [...previousLogs, log]);
  });

  // :snippet-start: set-log-level
  Realm.setLogLevel('all');
  // :snippet-end:

  return (
    <>
      <RealmProvider schema={[Turtle]}>
        <AddObjects />
      </RealmProvider>
      <FlatList
        data={logs}
        renderItem={({item}) => (
          <LogItem level={item.level} message={item.message} />
        )}
        keyExtractor={item => item.message}
      />
    </>
  );
};

const AddObjects = () => {
  const realm = useRealm();
  const [turtleName, setTurtleName] = useState('Change me!');
  const turtles = useQuery(Turtle);

  const writeRealmObject = (name: string) => {
    const newTurtle = {
      _id: new BSON.ObjectId(),
      name: name,
    };

    console.debug('writing new turtle', newTurtle);

    realm.write(() => {
      realm.create(Turtle, newTurtle);
    });

    console.debug(turtles);
  };

  return (
    <View>
      <TextInput onChangeText={setTurtleName} value={turtleName} />
      <Button
        title="Add Turtle"
        onPress={() => {
          writeRealmObject(turtleName);
        }}
      />
      <Button
        title="Remove all turtles"
        onPress={() => {
          realm.write(() => {
            realm.deleteAll();
          });
        }}
      />
    </View>
  );
};
