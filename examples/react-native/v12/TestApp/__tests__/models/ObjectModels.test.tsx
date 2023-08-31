import 'react-native';
import React from 'react';
import {ObjectModels} from '../../src/components/ObjectModels';
import {render, screen} from '@testing-library/react-native';

test('Object models', async () => {
  render(<ObjectModels />);

  // If the Person schema is part of the realm configuration, we can get it
  // in the realm, then render the schema's name to the UI.
  const personSchemaNode = await screen.findByText('Person', {
    exact: false,
  });

  // Ensure the rendered name matches the name we expect.
  const renderedSchemaName = personSchemaNode.children[0];
  expect(renderedSchemaName).toBe('Person');
});
