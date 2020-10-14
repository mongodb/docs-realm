var apiKeyClient = user.ApiKeys;
var allKeys = await apiKeyClient.FetchAllAsync();
foreach (var key in allKeys)
{
    Console.WriteLine($"I fetched the key named {key.Name}. " +
        $"Is it enabled? {key.IsEnabled}");
}