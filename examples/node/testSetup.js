import Realm from "realm";

jest.useFakeTimers();
global.console = {
  ...global.console,
  "log": jest.fn(),
  "error": jest.fn(),
  "warn": jest.fn(),
}
