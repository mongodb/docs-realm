const app = new Realm.App({ id: "myapp-abcde" });

// Remove the current user from the device
const user = app.currentUser;
await app.removeUser(user);

// The user is no longer the active user
if(app.currentUser) {
  // The active user is now another logged in user, if there is one
  assert(user.id !== app.currentUser.id)
}

// The user is no longer on the device
assert(app.allUsers().find(({ id }) => id === user.id) === undefined);
