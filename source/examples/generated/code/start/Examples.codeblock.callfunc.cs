var result = await
    user.Functions.CallAsync("sum", 2, 40);

// result.ToInt32() == 42