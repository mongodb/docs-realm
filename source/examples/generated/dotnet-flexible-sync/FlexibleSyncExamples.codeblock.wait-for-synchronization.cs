// Wait for the server to acknowledge the subscription and return all objects
// matching the query
await subscriptions.WaitForSynchronizationAsync();
