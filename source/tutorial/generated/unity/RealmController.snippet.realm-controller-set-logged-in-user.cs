// query the realm to find any Player objects with the matching name
var matchedPlayers = realm.All<Player>().Where(p => p.Name == userInput);

if (matchedPlayers.Count() > 0) // if the player exists
{
    currentPlayer = matchedPlayers.First();
    var stat = new Stat();
    stat.StatOwner = currentPlayer;

    realm.Write(() =>
    {
        currentStat = realm.Add(stat);
        currentPlayer.Stats.Add(currentStat);
    });
}
else
{
    var player = new Player();
    player.Id = ObjectId.GenerateNewId().ToString();
    player.Name = userInput;

    var stat = new Stat();
    stat.StatOwner = player;

    realm.Write(() =>
    {
        currentPlayer = realm.Add(player);
        currentStat = realm.Add(stat);
        currentPlayer.Stats.Add(currentStat);
    });
}
