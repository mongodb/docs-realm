Refresh tokens expire after a set period of time. 
When the refresh token expires, the access token can no longer be
refreshed and the user must log in again.

If the refresh token expires after the database is open, the device cannot 
sync until the user logs in again. Your sync error handler should implement
logic that catches a token expired error when attempting to sync, then redirect
users to a login flow.

For information on configuring refresh token expiration, refer to 
:ref:`refresh-token-expiration` in the App Services documentation.
