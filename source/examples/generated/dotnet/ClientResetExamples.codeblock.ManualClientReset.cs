private void SetupRealm()
{
    var fsConfig = new FlexibleSyncConfiguration(user);
    fsConfig.OnSessionError = HandleSessionError;
    var realm = await Realm.GetInstanceAsync(fsConfig);
}

private void HandleSessionError(Session session, SessionException error)
{
    if (error is ClientResetException clientResetException)
    {
        Console.WriteLine("Client Reset requested for " +
        session.Path + "due to " + error.Message);

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
}
