var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
<<<<<<< HEAD
Console.WriteLine($"I fetched the key named {key.Name}. " +
    $"Is it enabled? {key.IsEnabled}");
=======
Console.WriteLine($"I fetched the key named {key.Name}. " +
    $"Is it enabled? {key.IsEnabled}");
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312
