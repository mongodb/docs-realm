private void SetupRealm()
{
    var fsConfig = new FlexibleSyncConfiguration(user);
    fsConfig.ClientResetHandler = new DiscardLocalResetHandler()
    {
        OnBeforeReset = HandleBeforeResetCallbak,
        OnAfterReset = HandleAfterResetCallback,
        ManualResetFallback = HandleManualResetCallback
    };

    var realm = await Realm.GetInstanceAsync(fsConfig);
}

private void HandleBeforeResetCallbak(Realm beforeFrozen)
{
    // This method is useful if you want to make a backup of the
    // existing Realm before it is reset by the system.
}

private void HandleAfterResetCallback(Realm beforeFrozen, Realm after)
{
    // This method is useful if you want to merge in changes that
    // were in the "before" Realm into the re-created Realm
}

private void HandleManualResetCallback(ClientResetException clientResetException)
{
    // An error occurred. Use this method to perform a manual client reset.

    // Prompt user to perform client reset immediately. If they don't do it,
    // they won't receive any data from the server until they restart the app
    // and all changes they make will be discarded when the app restarts.
    var didUserConfirmReset = ShowUserAConfirmationDialog();
    if (didUserConfirmReset)
    {
        // Close the Realm before doing the reset. It must be 
        // deleted as part of the reset.
        realm.Dispose();

        // perform the client reset
        var didReset = clientResetException.InitiateClientReset();
        if (didReset)
        {
            // Navigate the user back to the main page or reopen the
            // the Realm and reinitialize the current page.
        }
        else
        {
            // Reset failed - notify user that they'll need to
            // restart the app.
        }
    }
}
