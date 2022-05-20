var updateResult = await cudCollection.UpdateOneAsync(
    new BsonDocument("_id", user.Id),
    new BsonDocument("$set", new BsonDocument("IsCool", false)));

await user.RefreshCustomDataAsync();
var cud = BsonSerializer.Deserialize<CustomUserData>(user.CustomData);

Console.WriteLine($"User is cool: {cud.IsCool}");
Console.WriteLine($"User's favorite color is {cud.FavoriteColor}");
Console.WriteLine($"User's timezone is {cud.LocalTimeZone}");