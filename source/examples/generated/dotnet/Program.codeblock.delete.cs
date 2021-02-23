var mostExpensiveGuitar = realm.All<Guitar>()
    .OrderByDescending(g => g.Price).First();

realm.Write(() =>
{
    realm.Remove(mostExpensiveGuitar);
});
