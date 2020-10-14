var apiKeyClient = user.ApiKeys;
var key = await apiKeyClient.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
await apiKeyClient.DeleteAsync(key.Id);