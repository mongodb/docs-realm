import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

describe("Work with multiple users", () => {
  afterAll(async () => {
    const users = app.allUsers;
    users.forEach((user) => Realm.deleteUser(user));
  });
  test("Add new user to device", async () => {
    // :snippet-start: add-new-user
    // Log in as Joe
    const joeCredentials = Realm.Credentials.emailPassword(
      "joe@example.com",
      "passw0rd"
    );
    const joe = await app.logIn(joeCredentials);
    // The active user is now Joe
    console.assert(joe.id === app.currentUser.id);
    expect(joe.id).toBe(app.currentUser.id); // :remove:

    // Log in as Emma
    const emmaCredentials = Realm.Credentials.emailPassword(
      "emma@example.com",
      "pa55word"
    );
    const emma = await app.logIn(emmaCredentials);
    // The active user is now Emma, but Joe is still logged in
    console.assert(emma.id === app.currentUser.id);
    // :snippet-end:
    expect(emma.id).toBe(app.currentUser.id);
    await joe.logOut();
    await emma.logOut();
  });
  test("List all on device users", async () => {
    const emmaCredentials = Realm.Credentials.emailPassword(
      "emma@example.com",
      "pa55word"
    );
    const emma = await app.logIn(emmaCredentials);
    // :snippet-start: list-all-on-device-users
    // Get a list of all Users
    app.allUsers.forEach((user) => {
      console.log(
        `User with id ${user.id} is ${
          user.isLoggedIn ? "logged in" : "logged out"
        }`
      );
    });
    // :snippet-end:
    expect(app.allUsers.find((user) => user.id === emma.id)).toBe(undefined);
  });
  test("Switch the active user", async () => {
    const newUser1 = await app.logIn(Realm.Credentials.anonymous());
    const newUser2 = await app.logIn(Realm.Credentials.anonymous());
    // :snippet-start:switch-active-user
    // Get some logged-in users
    const authenticatedUsers = app.allUsers.filter((user) => user.isLoggedIn);
    const user1 = authenticatedUsers[0];
    const user2 = authenticatedUsers[1];

    // Switch to user1
    app.switchUser(user1);
    // The active user is now user1
    console.assert(app.currentUser.id === user1.id);
    expect(app.currentUser.id).toBe(user1.id); // :remove:
    // Switch to user2
    app.switchUser(user2);
    // The active user is now user2
    console.assert(app.currentUser.id === user2.id);
    // :snippet-end:
    expect(app.currentUser.id).toBe(user2.id);
    await newUser1.logOut();
    await newUser2.logOut();
  });
  test("Remove a user from the device", async () => {
    // :snippet-start: remove-user-from-device
    // Remove the current user from the device
    const user = app.currentUser;
    await app.removeUser(user);

    // The user is no longer the active user
    if (app.currentUser) {
      // The active user is now the logged in user (if there still is one) that was
      // most recently active
      console.assert(user.id !== app.currentUser.id);
    }

    // The user is no longer on the device
    console.assert(app.allUsers.find(({ id }) => id === user.id) === undefined);
    // :snippet-end:
    expect(user.id).not.toBe(app.currentUser.id);
    expect(app.allUsers.find(({ id }) => id === user.id)).toBe(undefined);
  });
});
