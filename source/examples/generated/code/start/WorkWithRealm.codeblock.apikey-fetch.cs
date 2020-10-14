var apiKeyClient = user.ApiKeys;
var key = await apiKeyClient.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
Console.WriteLine($"I fetched the key named {key.Name}. " +
    $"Is it enabled? {key.IsEnabled}");