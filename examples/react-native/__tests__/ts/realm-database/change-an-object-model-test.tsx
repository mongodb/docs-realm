import Realm from 'realm';
import {createRealmContext} from '@realm/react';

describe('Change an Object Model Tests', () => {
  it('should add a property to a schema', () => {
    // :snippet-start: add-a-property-to-schema
    // :replace-start: {
    //  "terms": {
    //   "MyPerson": "Person"
    //   }
    // }
    class MyPerson extends Realm.Object {
      static schema = {
        name: 'MyPerson',
        properties: {
          firstName: 'string',
          lastName: 'string',
          age: 'int',
        },
      };
    }

    const config = {
      schema: [MyPerson],
      schemaVersion: 2,
      // :remove-start:
      inMemory: true,
      // :remove-end:
    };
    const {RealmProvider} = createRealmContext(config);
    // :replace-end:
    // :snippet-end:
  });

  it('should delete a property from a schema', () => {
    class MyPerson extends Realm.Object {
      static schema = {
        name: 'MyPerson',
        properties: {
          firstName: 'string',
          age: 'int',
        },
      };
    }
    // :snippet-start: delete-a-property-from-a-schema
    // :replace-start: {
    //  "terms": {
    //   "MyPerson": "Person"
    //   }
    // }
    const config = {
      schema: [MyPerson],
      schemaVersion: 2,
      // :remove-start:
      inMemory: true,
      // :remove-end:
    };
    const {RealmProvider} = createRealmContext(config);
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
    class MyPerson extends Realm.Object {
      static schema = {
        name: 'MyPerson',
        properties: {
          fullName: 'string',
          age: 'int',
        },
      };
    }

    const config = {
      schema: [MyPerson],
      schemaVersion: 2,
      migration: (oldRealm: Realm, newRealm: Realm) => {
        // only apply this change if upgrading to schemaVersion 2
        if (oldRealm.schemaVersion < 2) {
          const oldObjects = oldRealm.objects('Person');
          const newObjects = newRealm.objects('Person');
          // loop through all objects and set the fullName property in the new schema
          for (const objectIndex in oldObjects) {
            const oldObject = oldObjects[objectIndex];
            const newObject = newObjects[objectIndex];
            newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
          }
        }
      },
    };
    const {RealmProvider} = createRealmContext(config);
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
    class MyTask extends Realm.Object {
      static schema = {
        name: 'MyTask',
        properties: {
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
      schemaVersion: 2,
      migration: (oldRealm: Realm, newRealm: Realm) => {
        if (oldRealm.schemaVersion < 2) {
          const oldObjects = oldRealm.objects('Dog');
          const newObjects = newRealm.objects('Dog');
          // loop through all objects and set the _id property in the new schema
          for (const objectIndex in oldObjects) {
            const oldObject = oldObjects[objectIndex];
            const newObject = newObjects[objectIndex];
            newObject._id = oldObject._id.toHexString();
          }
        }
      },
    };
    const {RealmProvider} = createRealmContext(config);
    // :replace-end:
    // :snippet-end:
  });
});
