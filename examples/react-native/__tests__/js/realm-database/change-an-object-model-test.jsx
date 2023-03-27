import React from 'react';
import {View, Text} from 'react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import {render} from '@testing-library/react-native';

class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      _id: 'string',
      firstName: 'string',
      lastName: 'string',
    },
  };
}

const config = {
  schema: [Person],
};

describe('Change an Object Model Tests', () => {

  it('should establish a base realm', async () => {

    // Establish base realm and schema to check modifications against.
    Realm.open(config).then(realm => {

      // Write initial object to local realm
      realm.write(() => {
        realm.create('Person', {
          _id: '1239feaae9',
          firstName: 'Bilbo',
          lastName: 'Baggins',
        });
      });

      expect(realm.schemaVersion).toBe(0);

      realm.close();
    });

    const realmExists = Realm.exists(config);

    expect(realmExists).toBe(true);
  });

  it('should add a property to a schema', async () => {
    // :snippet-start: add-a-property-to-schema

    class Person extends Realm.Object {
      static schema = {
        name: 'Person',
        properties: {
          _id: 'string',
          firstName: 'string',
          lastName: 'string',
          // add a new property, 'age' to the schema
          age: 'int',
        },
      };
    }

    const config = {
      schema: [Person],
      // increment the 'schemaVersion', since 'age' has been added to the schema
      schemaVersion: 2,
    };

    // :replace-start: {
    //    "terms": {
    //       "RealmProvider, useRealm": "RealmProvider"
    //    }
    // }
    // pass the configuration object with the updated 'schemaVersion' to createRealmContext()
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      // This test assumes only one object model exists.
      expect(realm.schema[0]).toHaveProperty('properties.age');
      expect(realm.schemaVersion).toBe(2);

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);
  });

  it('should delete a property from a schema', () => {
    // :snippet-start: delete-a-property-from-a-schema
    class Person extends Realm.Object {
      static schema = {
        name: 'Person',
        properties: {
          _id: 'string',
          firstName: 'string',
          age: 'int',
        },
      };
    }

    const config = {
      schema: [Person],
      // increment the 'schemaVersion', since 'lastName' has been removed from the schema
      schemaVersion: 3,
    };

    // :replace-start: {
    //    "terms": {
    //       "RealmProvider, useRealm": "RealmProvider"
    //    }
    // }
    // pass the configuration object with the updated 'schemaVersion' to createRealmContext()
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      // This test assumes only one object model exists.
      expect(realm.schema[0]).not.toHaveProperty('properties.lastName');
      expect(realm.schemaVersion).toBe(3);

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);
  });

  it('should rename a property', async () => {
    // :snippet-start: rename-a-property-of-a-schema
    class Person extends Realm.Object {
      static schema = {
        name: 'Person',
        properties: {
          _id: 'string',
          // rename the 'firstName' and 'lastName' property, to 'fullName' in the schema
          fullName: 'string',
          age: 'int',
        },
      };
    }

    const config = {
      schema: [Person],
      // increment the 'schemaVersion', since 'fullName' has replaced 'firstName' and 'lastName' in the schema
      schemaVersion: 4,
      migration: (oldRealm, newRealm) => {
        // only apply this change if upgrading schemaVersion
        if (oldRealm.schemaVersion < 4) {
          const oldObjects = oldRealm.objects(Person);
          const newObjects = newRealm.objects(Person);
          // loop through all objects and set the fullName property in the new schema
          for (const objectIndex in oldObjects) {
            const oldObject = oldObjects[objectIndex];
            const newObject = newObjects[objectIndex];
            newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
          }
        }
      },
    };

    // :replace-start: {
    //    "terms": {
    //       "RealmProvider, useRealm": "RealmProvider"
    //    }
    // }
    // pass the configuration object with the updated 'schemaVersion' and 'migration' function to createRealmContext()
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      // This test assumes only one object model exists.
      expect(realm.schema[0]).not.toHaveProperty('properties.lastName');
      expect(realm.schema[0]).not.toHaveProperty('properties.firstName');
      expect(realm.schema[0]).toHaveProperty('properties.fullName');
      expect(realm.schemaVersion).toBe(4);

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);
  });

  it('should modify a property type', () => {
    // :snippet-start: modify-a-property-type

    class Person extends Realm.Object {
      static schema = {
        name: 'Person',
        properties: {
          // update the data type of '_id' to be 'objectId' within the schema
          _id: 'objectId',
          firstName: 'string',
          lastName: 'string',
        },
      };
    }

    const config = {
      schema: [Person],
      // increment the 'schemaVersion', since the property type of '_id'
      // has been modified
      schemaVersion: 5,
      migration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < 2) {
          const oldObjects = oldRealm.objects(Person);
          const newObjects = newRealm.objects(Person);
          // loop through all objects and set the _id property
          // in the new schema
          for (const objectIndex in oldObjects) {
            const oldObject = oldObjects[objectIndex];
            const newObject = newObjects[objectIndex];
            newObject._id = new Realm.BSON.ObjectId(oldObject._id);
          }
        }
      },
    };

    // :replace-start: {
    //    "terms": {
    //       "RealmProvider, useRealm": "RealmProvider"
    //    }
    // }
    // Pass the configuration object with the updated
    // 'schemaVersion' and 'migration' function to createRealmContext()
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      // This test assumes only one object model exists.
      expect(realm.schema[0].properties._id.type).toBe('objectId');
      expect(realm.schemaVersion).toBe(5);

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);
  });

  it('should remove local realm file', () => {
    // Delete any existing local file
    Realm.deleteFile(config);

    const realmExists = Realm.exists(config);

    expect(realmExists).toBe(false);
  });
});
