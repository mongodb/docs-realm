var davidsStrat = realm.All<Guitar>().FirstOrDefault(
    g => g.Owner == "D. Gilmour"
    && g.Make == "Fender"
    && g.Model == "Stratocaster");

realm.Write(() =>
{
    davidsStrat.Price = 1700345.56;
});
