Session.Error += (session, errorArgs) =>
{
    var sessionException = (SessionException)errorArgs.Exception;
    switch (sessionException.ErrorCode)
    {
        case ErrorCode.AccessTokenExpired:
        case ErrorCode.BadUserAuthentication:
            // Ask user for credentials
            break;
        case ErrorCode.PermissionDenied:
            // Tell the user they don't have permissions to work with that Realm
            break;
        case ErrorCode.Unknown:
            // Likely the app version is too old, prompt for update
            break;
            // ...
    }
};
