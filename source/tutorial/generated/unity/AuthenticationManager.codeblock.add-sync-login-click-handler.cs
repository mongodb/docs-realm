// OnPressLoginWithBackend() is an asynchronous method that calls
// RealmController.SetLoggedInUser to login and passes the currentPlayer to
// ScoreCardManager and LeaderboardManager; once logged in the login screen
// is hidden and the logout button is shown
private static async void OnPressLoginWithBackend()
{
    try
    {
        var currentPlayer = await RealmController.SetLoggedInUser(userInput.value, passInput.value);
        if (currentPlayer != null)
        {
            HideAuthenticationUI();
        }
        ScoreCardManager.SetLoggedInUser(currentPlayer.Name);
        LeaderboardManager.Instance.SetLoggedInUser(currentPlayer.Name);
    }
    catch (Exception ex)
    {
        Debug.Log("an exception was thrown:" + ex.Message);
    }
}
