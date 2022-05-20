var appConfig = new AppConfiguration(myRealmAppId)
{
    LogLevel = LogLevel.Debug,
    DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
};

app = App.Create(appConfig);