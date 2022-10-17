config.OnSessionError = (session, sessionException) =>
{
    switch (sessionException.ErrorCode)
    {
        case ErrorCode.InvalidCredentials:
            // Tell the user they don't have permissions to work with that Realm
            break;
        case ErrorCode.Unknown:
            // See https://www.mongodb.com/docs/realm-sdks/dotnet
            // /latest/reference/Realms.Sync.Exceptions.ErrorCode.html
            // for all of the error codes
            break;
    }
};
