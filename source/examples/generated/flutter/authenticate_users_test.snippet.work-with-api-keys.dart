// Create user API key
ApiKey apiKey = await user.apiKeys.create("api-key-name");

// Get existing user API key by ID
// Returns `null` if no existing API key for the ID
ApiKey? refetchedApiKey = await user.apiKeys.fetch(apiKey.id);

// Get all API keys for a user
List<ApiKey> apiKeys = await user.apiKeys.fetchAll();

// Disable API key
await user.apiKeys.disable(apiKey.id);

// Check if API key is enabled
print(apiKey.isEnabled); // prints `false`

// Enable API key
await user.apiKeys.enable(apiKey.id);

// Delete a user API key
await user.apiKeys.delete(apiKey.id);
