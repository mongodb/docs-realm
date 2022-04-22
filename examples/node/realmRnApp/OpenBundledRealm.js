import React, {useState, useEffect} from 'react';
import Realm from 'realm';
import {Text} from 'react-native';

const Dog = {
  name: 'Dog',
  properties: {
    name: 'string',
    age: 'int',
    type: 'string',
  },
};

export default function OpenBundledRealm() {
  const [numDogs, setNumDogs] = useState(0);

  useEffect(() => {
    let realm;
    if (!numDogs) {
      (async () => {
        // :snippet-start: open-bundle-realm-rn
        Realm.copyBundledRealmFiles();

        realm = await Realm.open({
          schema: [Dog],
          path: 'bundle.realm',
        });
        // :snippet-end:
        const dogCount = realm.objects('Dog').length;
        setNumDogs(dogCount);
      })();
    }
    return () => !realm?.isClosed && realm?.close();
  }, [numDogs]);
  useEffect(() => {
    console.log(numDogs);
  }, [numDogs]);

  return <Text>{numDogs}</Text>;
}
