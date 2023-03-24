import React from 'react';
import {View, Text} from 'react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Person from '../Models/Person';

// TODO: Refactor test to render <RealmProvider> and use `expect` to test that
// changes are made.

describe('Change an Object Model Tests', () => {

  it('should add a property to a schema', () => {
    // :snippet-start: add-a-property-to-schema
    // :replace-start: {
    //  "terms": {
    //   "MyPerson": "Person"
    //   }
    // }
    class MyPerson extends Realm.Object<MyPerson> {
      firstName!: string;
      lastName!: string;
      age!: number;

      static schema = {
        name: 'MyPerson',
        properties: {
          firstName: 'string',
          lastName: 'string',
          // add a new property, 'age' to the schema
          age: 'int',
        },
      };
    }

    const config = {
      schema: [MyPerson],
      // increment the 'schemaVersion', since 'age' has been added to the schema
      schemaVersion: 2,
    };

    // pass the configuration object with the updated 'schemaVersion' to createRealmContext()
    const {RealmProvider} = createRealmContext(config);
    // :replace-end:
    // :snippet-end:

    const {useRealm} = createRealmContext(config);

    // render an App component, giving the CreateDogInput component access to the @realm/react hooks:
    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      // TODO: check the realm schema to see if `age` property is added.

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      )
    };

    render(<App />);

    // press the "Add Dog" button
    const handleAddDogBtn = await waitFor(
      () => getByTestId('handleAddDogBtn'),
      {timeout: 5000},
    );

    await act(async () => {
      fireEvent.press(handleAddDogBtn);
    });

    // check if the new Dog object has been created
    const myDog = assertionRealm.objects(Dog).filtered("name == 'Fido'")[0];
    
    expect(myDog.name).toBe('Fido');
    expect(myDog.age).toBe(1);
  });

  it('should delete a property from a schema', () => {
    // :snippet-start: delete-a-property-from-a-schema
    // :replace-start: {
    //  "terms": {
    //   "MyPerson": "Person"
    //   }
    // }
    class MyPerson extends Realm.Object<MyPerson> {
      firstName!: string;
      age!: number;

      static schema = {
        name: 'MyPerson',
        properties: {
          firstName: 'string',
          age: 'int',
        },
      };
    }

    const config = {
      schema: [MyPerson],
      // increment the 'schemaVersion', since 'lastName' has been removed from the schema
      schemaVersion: 2,
    };

    // pass the configuration object with the updated 'schemaVersion' to createRealmContext()
    createRealmContext(config);
    // :replace-end:
    // :snippet-end:
  });

  it('should rename a property', async () => {
    // :snippet-start: rename-a-property-of-a-schema
    // :replace-start: {
    //  "terms": {
    //   "MyPerson": "Person"
    //   }
    // }
    class MyPerson extends Realm.Object<MyPerson> {
      fullName!: string;
      age!: number;

      static schema = {
        name: 'MyPerson',
        properties: {
          // rename the 'firstName' and 'lastName' property, to 'fullName' in the schema
          fullName: 'string',
          age: 'int',
        },
      };
    }

    const config = {
      schema: [MyPerson],
      // increment the 'schemaVersion', since 'fullName' has replaced 'firstName' and 'lastName' in the schema
      schemaVersion: 2,
      migration: (oldRealm: Realm, newRealm: Realm) => {
        // only apply this change if upgrading to schemaVersion 2
        if (oldRealm.schemaVersion < 2) {
          const oldObjects = oldRealm.objects(MyPerson);
          const newObjects = newRealm.objects(MyPerson);
          // loop through all objects and set the fullName property in the new schema
          for (const objectIndex in oldObjects) {
            const oldObject = oldObjects[objectIndex];
            const newObject = newObjects[objectIndex];
            newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
          }
        }
      },
    };

    // pass the configuration object with the updated 'schemaVersion' and 'migration' function to createRealmContext()
    createRealmContext(config);
    // :replace-end:
    // :snippet-end:
  });

  it('should modify a property type', () => {
    // :snippet-start: modify-a-property-type
    // :replace-start: {
    //  "terms": {
    //   "MyTask": "Task"
    //   }
    // }
    class MyTask extends Realm.Object<MyTask> {
      _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
      name!: string;
      priority?: number;
      progressMinutes?: number;
      assignee?: Person;

      static schema = {
        name: 'MyTask',
        properties: {
          // update the data type of '_id' to be 'objectId' within the schema
          _id: 'objectId',
          name: 'string',
          priority: 'int?',
          progressMinutes: 'int?',
          assignee: 'Person?',
        },
        primaryKey: '_id',
      };
    }

    const config = {
      schema: [MyTask],
      // increment the 'schemaVersion', since the property type of '_id'
      // has been modified
      schemaVersion: 2,
      migration: (oldRealm: Realm, newRealm: Realm) => {
        if (oldRealm.schemaVersion < 2) {
          const oldObjects = oldRealm.objects(MyTask);
          const newObjects = newRealm.objects(MyTask);
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

    // pass the configuration object with the updated
    // 'schemaVersion' and 'migration' function to createRealmContext()
    createRealmContext(config);
    // :replace-end:
    // :snippet-end:
  });
});
