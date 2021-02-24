var harrysStrat = realm.All<Guitar>().FirstOrDefault(
    g => g.Owner == "D. Gilmour"
    && g.Make == "Fender"
    && g.Model == "Stratocaster");

realm.Write(() =>
{
    harrysStrat.Price = 322.56;
});
