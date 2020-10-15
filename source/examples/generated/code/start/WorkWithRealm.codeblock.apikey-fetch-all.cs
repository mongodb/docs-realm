var allKeys = await user.ApiKeys.FetchAllAsync();
foreach (var key in allKeys)
{
<<<<<<< HEAD
    Console.WriteLine($"I fetched the key named {key.Name}. " +
=======
    Console.WriteLine($"I fetched the key named {key.Name}. " +
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312
        $"Is it enabled? {key.IsEnabled}");
}