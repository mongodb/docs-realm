// OnPressRegister() is an asynchronous method that registers a user,
// creates a new Player and Stat object OnPressRegister takes a userInput
// and passInput, representing a username/password, as a parameter
public static async Task<Player> OnPressRegister(string userInput, string passInput)
{
    await realmApp.EmailPasswordAuth.RegisterUserAsync(userInput, passInput);
    syncUser = await realmApp.LogInAsync(Credentials.EmailPassword(userInput, passInput));
    realm = await GetRealm(syncUser);

    var player = new Player();
    player.Id = syncUser.Id;
    player.Name = userInput;
    var stat = new Stat();
    stat.StatOwner = player;
    realm.Write(() =>
    {
        currentPlayer = realm.Add(player);
        currentStat = realm.Add(stat);
        currentPlayer.Stats.Add(currentStat);
    });
    StartGame();
    return currentPlayer;
}
