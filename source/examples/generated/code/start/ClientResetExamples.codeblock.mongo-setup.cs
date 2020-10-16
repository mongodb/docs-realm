Session.Error += (sender, err) =>
{
    if (err.Exception is ClientResetException clientResetEx)
    {
        var session = (Session)sender;
        Console.WriteLine($"Client Reset requested for {session.Path} due to {clientResetEx.Message}");
        // Notify user that they will need to re-download the Realm.
        // InitiateClientReset will immediately reset the Realm and download the
        // server copy. If you don't call it, the Realm will be
        // reset the next time the app starts.
        var resetResult = clientResetEx.InitiateClientReset();
        Console.WriteLine(resetResult ? "Success" : "Reset failed");
    }
};