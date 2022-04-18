import Realm from 'realm';
import {render, act, waitFor} from '@testing-library/react-native';
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import OpenBundledRealm from '../OpenBundledRealm';
// TODO: test doesn't get the component state after useEffect called.
// refactor for that. not sure how to do.
test('can open a bundled realm', async () => {
  let node;
  await act(async () => {
    await waitFor(
      () => {
        const {toJSON} = render(<OpenBundledRealm />);
        node = toJSON;
      },
      {timeout: 1000},
    );
  });

  const numDogs = parseInt(node().children[0]);
  expect(numDogs).toBeGreaterThan(0);
});
