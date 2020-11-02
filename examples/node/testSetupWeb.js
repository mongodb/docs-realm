import * as Realm from "realm-web";


jest.useFakeTimers();
global.console = {
  ...global.console,
  "log": jest.fn(),
  "error": jest.fn(),
  "warn": jest.fn(),
}

global.Realm = Realm;