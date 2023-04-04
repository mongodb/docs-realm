AppConfiguration configuration = new AppConfiguration(Config.fsAppId)
{
    SyncTimeoutOptions = new SyncTimeoutOptions()
    {
        ConnectTimeout = TimeSpan.FromMinutes(2),
        ConnectionLingerTime = TimeSpan.FromSeconds(30),
        PingKeepAlivePeriod = TimeSpan.FromMinutes(1),
        PongKeepAliveTimeout = TimeSpan.FromMinutes(1),
        FastReconnectLimit = TimeSpan.FromMinutes(1),
    },
};

