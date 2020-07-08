const app = new Realm.App({ id: "myapp-abcde" });

// Get a list of all Users
const allUsers = app.allUsers();
allUsers.forEach(user => {
   console.log(`User with id ${user.id} is ${user.isLoggedIn ? "logged in" : "logged out"}`);
});
