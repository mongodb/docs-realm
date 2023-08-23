import 'react-native';
import React from 'react';
import {Geospatial} from '../../src/components/data-types/Geospatial';
import {render, screen} from '@testing-library/react-native';

test('Geospatial queries', async () => {
  render(<Geospatial />);

  const smallCircleNode = await screen.findByText('Small circle', {
    exact: false,
  });
  expect(smallCircleNode.children[1]).toBe('0');

  const largeCircleNode = await screen.findByText('Large circle', {
    exact: false,
  });
  expect(largeCircleNode.children[1]).toBe('1');

  const smallBoxNode = await screen.findByText('Small box', {
    exact: false,
  });
  expect(smallBoxNode.children[1]).toBe('2');

  const largeBoxNode = await screen.findByText('Small box', {
    exact: false,
  });
  expect(largeBoxNode.children[1]).toBe('2');

  const basicPolygon = await screen.findByText('Basic polygon', {
    exact: false,
  });
  expect(basicPolygon.children[1]).toBe('2');

  const polygonWithTwoHoles = await screen.findByText(
    'Polygon with two holes',
    {
      exact: false,
    },
  );
  expect(polygonWithTwoHoles.children[1]).toBe('1');
});
