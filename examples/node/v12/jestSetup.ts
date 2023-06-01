import { jest } from "@jest/globals";
import Realm from "realm";

jest.setTimeout(10000);

global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

global.beforeEach(() => {
  // Close and remove all realms in the default directory.
  Realm.clearTestState();
})
