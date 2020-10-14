var apiKeyClient = user.ApiKeys;
var key = await apiKeyClient.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
if (!key.IsEnabled)
{
    // enable the key
    await apiKeyClient.EnableAsync(key.Id);
}
else
{
    // disable the key
    await apiKeyClient.DisableAsync(key.Id);
}