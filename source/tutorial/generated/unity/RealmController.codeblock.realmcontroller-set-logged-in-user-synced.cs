// SetLoggedInUser() is an asynchronous method that logs in as a Realms.Sync.User, creates a new Stat object for the current playthrough
// and returns the Player object that corresponds to the logged in Realms.Sync.User
// SetLoggedInUser() takes a userInput and passInput, representing a username/password, as a parameter
public static async Task<Player> SetLoggedInUser(string userInput, string passInput)
{
    syncUser = await realmApp.LogInAsync(Credentials.EmailPassword(userInput, passInput));
    if (syncUser != null)
    {
        realm = await GetRealm(syncUser);
        currentPlayer = realm.Find<Player>(syncUser.Id);
        if (currentPlayer != null)
        {
            var stat = new Stat();
            stat.StatOwner = currentPlayer;
            realm.Write(() =>
            {
                currentStat = realm.Add(stat);
                currentPlayer.Stats.Add(currentStat);
            });
            StartGame();
        }
        else
        {
            Debug.Log("This player exists a MongoDB Realm User but not as a Realm Object, please delete the MongoDB Realm User and create one using the Game rather than MongoDB Atlas or Realm Studio");
        }
    }
    return currentPlayer;
}
