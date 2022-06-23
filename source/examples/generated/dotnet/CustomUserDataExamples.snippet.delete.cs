var deleteResult = await cudCollection.DeleteOneAsync(
    new BsonDocument("_id", user.Id));

var cud = user.GetCustomData<CustomUserData>();

// The `DeletedCount` should be 1
Console.WriteLine(deleteResult.DeletedCount);

// There should no longer be a custom user document for the user
var customData = await cudCollection.FindOneAsync(
    new BsonDocument("_id", user.Id));

Console.WriteLine(customData == null);

