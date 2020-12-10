// Get some logged-in users
const authenticatedUsers: Realm.User[] = app.allUsers.filter(user => user.isLoggedIn);
const user1: Realm.User = authenticatedUsers[0];
const user2: Realm.User = authenticatedUsers[1];

// Switch to user1
app.switchUser(user1);
// The active user is now user1
assert(app.currentUser.id === user1.id);

// Switch to user2
app.switchUser(user2);
// The active user is now user2
assert(app.currentUser.id === user2.id);
