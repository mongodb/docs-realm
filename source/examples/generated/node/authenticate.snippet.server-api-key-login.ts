// Get the API key from the local environment
const apiKey = process.env?.appServicesApiKey;
let user: Realm.User | undefined = undefined;

if (!apiKey) {
  throw new Error("Could not find a Server API Key.");
}

// Create an api key credential
const credentials = Realm.Credentials.apiKey(apiKey);

try {
  user = await app.logIn(credentials);
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to log in", error.message);
  }
}
