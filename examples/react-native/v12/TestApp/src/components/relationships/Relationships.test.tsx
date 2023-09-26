import 'react-native';
import React from 'react';
import {RelationshipExamples} from './RealmWrapper';
import {render, screen, userEvent, within} from '@testing-library/react-native';

describe('Atlas Device SDK relationships', () => {
  test('to-one relationship', async () => {
    // render the query component
    render(<RelationshipExamples />);

    const user = userEvent.setup();
    const carModelInput = await screen.findByTestId('to-one-input');
    const createButton = await screen.findByTestId(
      'create-to-one-relationship',
    );
    const removeButton = await screen.findByTestId('remove-all-objects');

    // Clear any existing realm objects
    await user.press(removeButton);

    await user.type(carModelInput, 'Sentra');
    await user.press(createButton);
    await user.clear(carModelInput);

    const carModelNode = await screen.findByTestId('car-model');
    expect(carModelNode.children[1]).toBe('Sentra');

    // Clean up
    await user.press(removeButton);
  });

  test('to-many relationship', async () => {
    // render the query component
    render(<RelationshipExamples />);

    const user = userEvent.setup();
    const carModelInput = await screen.findByTestId('to-many-input');
    const createButton = await screen.findByTestId(
      'create-to-many-relationship',
    );
    const removeButton = await screen.findByTestId('remove-all-objects');

    // Clear any existing realm objects
    await user.press(removeButton);

    // Create first car
    await user.type(carModelInput, 'Sentra');
    await user.press(createButton);
    await user.clear(carModelInput);

    // Create second car
    await user.type(carModelInput, 'Pathfinder');
    await user.press(createButton);
    await user.clear(carModelInput);

    // Get car <View> components
    const carNodes = await screen.findAllByTestId('car');
    expect(carNodes.length).toEqual(2);

    // Search within the first <View> component for model and manufacturer info
    const firstCarModel = await within(carNodes[0]).findByTestId('model');
    const firstCarManufacturer = await within(carNodes[0]).findByTestId(
      'manufacturer',
    );
    // Search within the second <View> component for model and manufacturer info
    const secondCarModel = await within(carNodes[1]).findByTestId('model');
    const secondCarManufacturer = await within(carNodes[1]).findByTestId(
      'manufacturer',
    );

    expect(firstCarModel.children[1]).toBe('Sentra');
    expect(firstCarManufacturer.children[1]).toBe('Nissan');
    expect(secondCarModel.children[1]).toBe('Pathfinder');
    expect(secondCarManufacturer.children[1]).toBe('Nissan');

    // Clean up
    await user.press(removeButton);
  });
});
