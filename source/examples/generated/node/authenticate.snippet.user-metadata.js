try {
  await app.logIn(Realm.Credentials.<email>Password(<email>, <password>));
} catch (err) {
  console.error("Failed to log in", err.message);
}

const userEmail = app.currentUser.profile.email;
