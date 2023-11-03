import {jest, beforeEach} from '@jest/globals';

// Needed to clear the test state.
import Realm, {flags} from 'realm';
flags.ALLOW_CLEAR_TEST_STATE = true;

// avoid error: Cannot find module 'NativeAnimatedHelper'
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

beforeEach(async () => {
  // Close and remove all realms in the default directory.
  Realm.clearTestState();

  // Use promise hack to wait realm to clear
  await new Promise(r => setTimeout(r, 100));
});
