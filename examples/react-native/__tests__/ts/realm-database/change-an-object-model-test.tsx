import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Person from '../Models/Person';

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
    createRealmContext(config);
    // :replace-end:
    // :snippet-end:
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
