import 'react-native';
import React from 'react';
import {CompensatingWriteErrorHandling} from './CompensatingWriteWrapper';
import {render, screen, userEvent} from '@testing-library/react-native';

test('Compensating write error handling', async () => {
  render(<CompensatingWriteErrorHandling />);

  // Set up a User Event object.
  const user = userEvent.setup();

  const writeWithinSubscriptionsButton = await screen.findByTestId(
    'write-within-subscriptions',
    {timeout: 2000},
  );
  const writeOutsideSubscriptionsButton = await screen.findByTestId(
    'write-outside-subscriptions',
  );
  const removeAllObjectsButton = await screen.findByTestId(
    'remove-all-objects',
  );

  screen.debug();

  // await user.press(writeWithinSubscriptionsButton);
  // console.debug('--- after writeWithinSubscriptionsButton pressed');

  // const peopleListNode = await screen.findByTestId('people-list-container');
  // const peopleNodes = await within(peopleListNode).findAllByTestId('person');
  // expect(peopleNodes.length).not.toEqual(0);

  // await user.press(writeOutsideSubscriptionsButton);
  // console.debug('--- after writeOutsideSubscriptionsButton pressed');

  // const errorListNode = await screen.findByTestId('error-list-container');
  // expect(errorListNode).toBeInTheDocument;

  // console.debug('+++ before error node query');
  // const compensatingWriteErrorNodes = await screen.findAllByTestId(
  //   'compensating-write-error',
  //   {timeout: 4000},
  // );
  // console.debug('--- after error node query');

  // expect(compensatingWriteErrorNodes.length).toBeGreaterThan(0);

  // await user.press(removeAllObjectsButton);
  // console.debug('---after remove all objects pressed');

  // const updatedPeopleListNode = await screen.findByTestId(
  //   'people-list-container',
  // );
  // const updatedPeopleNodes = await within(
  //   updatedPeopleListNode,
  // ).findAllByTestId('person');

  // expect(updatedPeopleNodes.length).toEqual(0);
});
