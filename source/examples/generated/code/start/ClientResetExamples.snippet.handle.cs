Session.Error += (sender, err) =>
{
    if (err.Exception is ClientResetException clientResetEx)
    {
        var session = (Session)sender;
        Console.WriteLine("Client Reset requested for " +
            session.Path +"due to "+ clientResetEx.Message);

        // Prompt user to perform client reset immediately. If they don't do it,
        // they won't receive any data from the server until they restart the app
        // and all changes they make will be discarded when the app restarts.
        var didUserConfirmReset = true;
        if (didUserConfirmReset)
        {
            // Close the Realm before doing the reset as it'll need
            // to be deleted and all objects obtained from it will be
            // invalidated.
            realm.Dispose();
            var didReset = clientResetEx.InitiateClientReset();
            if (didReset)
            {
                // Navigate the user back to the main page or reopen the
                // the Realm and reinitialize the current page.
            }
            else
            {
                // Reset failed - notify user that they'll need to restart the app.
            }
        }
    }
};