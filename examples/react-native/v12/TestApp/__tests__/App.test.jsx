import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

test('renders correctly', async () => {
  const {findByText} = render(<App />);

  const renderedText = await findByText('Realm status: open');

  expect(renderedText.children[1]).toBe('open');
});
