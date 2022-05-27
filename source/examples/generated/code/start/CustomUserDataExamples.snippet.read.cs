await user.RefreshCustomDataAsync();

// Tip: define a class that represents the custom data:
var cud = BsonSerializer.Deserialize<CustomUserData>(user.CustomData);

Console.WriteLine($"User is cool: {cud.IsCool}");
Console.WriteLine($"User's favorite color is {cud.FavoriteColor}");
Console.WriteLine($"User's timezone is {cud.LocalTimeZone}");