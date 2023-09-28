import {jest} from '@jest/globals';

// Needed to clear the test state.
import {flags} from 'realm';
flags.ALLOW_CLEAR_TEST_STATE = true;

// avoid error: Cannot find module 'NativeAnimatedHelper'
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
