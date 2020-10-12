// Get the API key from the local environment
const apiKey = process.env.realmServerApiKey;
// Create an api key credential
const credentials = Realm.Credentials.serverApiKey(apiKey);
try {
  const user = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);
  return user;
} catch(err) {
  console.error("Failed to log in", err.message);
}