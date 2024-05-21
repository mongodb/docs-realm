App app = App.Create(myRealmAppId);
Realms.Sync.User user = app.LogInAsync(
    Credentials.Anonymous()).Result;
