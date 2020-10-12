import Realm from "realm";

jest.useFakeTimers();
global.console = {
  ...global.console,
  "log": jest.fn(),
  "error": jest.fn(),
  "warn": jest.fn(),
}

const app = new Realm.App({ id: "example-testers-kvjdy" });

// Set the app up with test users
beforeAll(async () => {
  // Create the example email/password & API key users
  const anon = await app.logIn(Realm.Credentials.anonymous());
  const { key: realmServerApiKey } = await app.currentUser.functions.createTestUsers();
  await anon.logOut();

  // Add the API key to process.env so that we can reference it in other tests as if it was defined in a .env file
  process.env = {
    ...process.env,
    realmServerApiKey,
  }

  jest.runAllTimers();
});

// Delete the test users to restore the app to its default state
afterAll(async () => {
  await app.logIn(Realm.Credentials.anonymous());
  // Delete all users on the server
  // Bit of a race condition here to log out the current user before they're deleted server-side
  // AFAICT this never fails but not 100% confident
  const deleteAllUsersPromise = app.currentUser.functions.deleteAllUsers();
  await app.currentUser.logOut();
  await deleteAllUsersPromise;
  // End race condition
  
  for (const [userId, user] of Object.entries(app.allUsers)) {
    await app.removeUser(user);
  }

  jest.runAllTimers();
});
