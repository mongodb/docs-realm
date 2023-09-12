// avoid error: Cannot find module 'NativeAnimatedHelper'
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
