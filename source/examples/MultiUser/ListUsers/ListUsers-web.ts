const app: Realm.App = new Realm.App({ id: "myapp-abcde" });

// Get a list of all Users
const allUsers: Realm.User[] = app.allUsers();
allUsers.forEach((user: Realm.User) => {
   console.log(`User with id ${user.id} is ${user.isLoggedIn ? "logged in" : "logged out"}`);
});
