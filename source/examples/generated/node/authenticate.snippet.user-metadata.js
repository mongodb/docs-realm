try {
  await app.logIn(
    Realm.Credentials.emailPassword("someone@example.com", "Pa55w0rd!")
  );
} catch (err) {
  console.error("Failed to log in", err.message);
}

const userEmail = app.currentUser.profile.email;
