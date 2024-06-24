App app = App.Create(myAppId);
Realms.Sync.User user = app.LogInAsync(
    Credentials.Anonymous()).Result;
