// Log out the current user
await app.currentUser?.logOut();
// Log out a specific user by ID
if (app.currentUser) {
  await app.allUsers[app.currentUser.id].logOut();
}