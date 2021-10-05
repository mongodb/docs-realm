// OnPressRegister() passes RealmController.OnPressRegister() the values of
// the userInput and  passInput TextFields in order to register a user
private static async void OnPressRegister()
{
    try
    {
        var currentPlayer = await RealmController.OnPressRegister(userInput.value, passInput.value);

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
