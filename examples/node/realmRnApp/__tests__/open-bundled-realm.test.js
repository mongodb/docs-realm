import Realm from 'realm';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OpenBundledRealm} from '../App';
// TODO: test doesn't get the component state after useEffect called.
// refactor for that. not sure how to do.
test.skip('can open a bundled realm', async () => {
  const node = render(<OpenBundledRealm />);
  await new setTimeout(() => undefined, 1000);

  console.log(node.toJSON());
});
