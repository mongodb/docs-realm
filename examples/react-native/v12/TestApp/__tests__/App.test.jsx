/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

// Note: import explicitly to use the types shiped with jest.
import {test, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  const {findByText} = render(<App />);

  const renderedText = await findByText('Realm status: open');

  expect(renderedText.children[1]).toBe('open');
});
