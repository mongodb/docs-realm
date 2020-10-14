var apiKeyClient = user.ApiKeys;
var newKey = await apiKeyClient.CreateAsync("someKeyName");
Console.WriteLine($"I created a key named {newKey.Name}. " +
    $"Is it enabled? {newKey.IsEnabled}");