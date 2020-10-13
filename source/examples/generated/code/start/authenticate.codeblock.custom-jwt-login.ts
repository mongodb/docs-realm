// Create a custom jwt credential
const jwt: string = await authenticateWithExternalSystem();  
const credentials = Realm.Credentials.jwt(jwt);
try {
  const user: Realm.User = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);
  return user;
} catch(err) {
  console.error("Failed to log in", err.message);
}