import 'react-native';
import React from 'react';
import {SubscribeApiExamples} from '../../components/subscribeApi/WrapperSubscribeApi';
import {render, screen, userEvent} from '@testing-library/react-native';

test('Subscribe API', async () => {
  render(<SubscribeApiExamples />);

  const user = userEvent.setup();

  // Get the seenBird subscription name node. If the `.subscribe()`
  // method works, its name will be written to this node.
  const seenBirdSubNode = await screen.findByTestId('seenbird-subscription');
  expect(seenBirdSubNode).toBeInTheDocument;

  const renderedSeenBirdSubName = seenBirdSubNode.children[1];
  expect(renderedSeenBirdSubName).toBe('First time sync only');

  const unSeenBirdSubNode = await screen.findByTestId(
    'unseenbird-subscription',
  );
  expect(unSeenBirdSubNode).toBeInTheDocument;

  const renderedUnseenBirdSubName = seenBirdSubNode.children[1];
  expect(renderedUnseenBirdSubName).toBe('Always wait');

  // const bluebirdSubNode = await screen.findByTestId('bluebird-subscription');
  // console.debug(bluebirdSubNode);

  // All bluebirds
});
