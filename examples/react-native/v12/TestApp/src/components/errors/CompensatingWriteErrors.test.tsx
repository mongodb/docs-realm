import 'react-native';
import React from 'react';
import {CompensatingWriteErrorHandling} from './CompensatingWriteWrapper';
import {render, screen, within, userEvent} from '@testing-library/react-native';

describe('Compensating write error handling', () => {
  // const removeAllObjectsButton = await screen.findByTestId(
  //   'remove-all-objects',
  // );

  beforeEach(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test('Write within subscriptions', async () => {
    render(<CompensatingWriteErrorHandling />);

    // Set up a User Event object.
    const user = userEvent.setup();

    const writeWithinSubscriptionsButton = await screen.findByTestId(
      'write-within-subscriptions',
      {timeout: 2000},
    );

    await user.press(writeWithinSubscriptionsButton);

    const peopleListNode = await screen.findByTestId('people-list-container');
    const peopleNodes = await within(peopleListNode).findAllByTestId('person');

    expect(peopleNodes.length).not.toEqual(0);
  });

  test('Write outside subscriptions', async () => {
    render(<CompensatingWriteErrorHandling />);

    // Set up a User Event object.
    const user = userEvent.setup();

    const writeOutsideSubscriptionsButton = await screen.findByTestId(
      'write-outside-subscriptions',
    );

    await user.press(writeOutsideSubscriptionsButton);

    const errorListNode = await screen.findByTestId('error-list-container', {
      timeout: 2000,
    });

    expect(errorListNode).toBeInTheDocument;

    // TODO: pick up here. can't find node in unmounted component.
    const compensatingWriteErrorNodes = await within(
      errorListNode,
    ).findAllByTestId('compensating-write-error');

    expect(compensatingWriteErrorNodes.length).not.toEqual(0);

    // await user.press(removeAllObjectsButton);

    // const updatedPeopleListNode = await screen.findByTestId(
    //   'people-list-container',
    // );
    // const updatedPeopleNodes = await within(
    //   updatedPeopleListNode,
    // ).findAllByTestId('person');

    // expect(updatedPeopleNodes.length).toEqual(0);
  });
});
