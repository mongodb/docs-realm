realm.Write(() =>
{
    realm.Add(new Guitar()
    {
        Make = "Gibson",
        Model = "Les Paul Custom",
        Price = 649.99,
        Owner = "N. Young"
    });
});
