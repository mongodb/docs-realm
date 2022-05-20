// SetLoggedInUser() is an asynchronous method that opens a realm, calls the CreateLeaderboardUI() method to create the LeaderboardUI and adds it to the Root Component
// and calls SetStatListener() to start listening for changes to all Stat objects in order to update the global leaderboard
// SetLoggedInUser() takes a userInput, representing a username, as a parameter
public async void SetLoggedInUser(string userInput)
{
    username = userInput;
    realm = await GetRealm();
