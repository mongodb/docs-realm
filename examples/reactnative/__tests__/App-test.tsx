/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Realm from "realm";


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id",
};

it('renders correctly', async () => {
  const realm = await Realm.open({
    path: 'myrealm',
    schema: [TaskSchema],
  });
  console.log(realm.path);
  // renderer.create(<App />);
});
