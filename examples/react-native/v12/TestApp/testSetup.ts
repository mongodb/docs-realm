// avoid error: Cannot find module 'NativeAnimatedHelper'
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.setTimeout(10000);

global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
