await user.RefreshCustomDataAsync();

// Tip: define a class that represents the custom data
// and use the gerneic overload of GetCustomData<>()
var cud = user.GetCustomData<CustomUserData>();

Console.WriteLine($"User is cool: {cud.IsCool}");
Console.WriteLine($"User's favorite color is {cud.FavoriteColor}");
Console.WriteLine($"User's timezone is {cud.LocalTimeZone}");
