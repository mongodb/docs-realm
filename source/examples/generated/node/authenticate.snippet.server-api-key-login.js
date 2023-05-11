// Get the API key from the local environment
const apiKey = process.env?.appServicesApiKey;
let user;

if (!apiKey) {
  throw new Error("Could not find a Server API Key.");
}

// Create an api key credential
const credentials = Realm.Credentials.apiKey(apiKey);

try {
  user = await app.logIn(credentials);
} catch (error) {
  console.error("Failed to log in", error.message);
}
