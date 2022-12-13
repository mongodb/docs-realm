When a user logs in, Atlas App Services creates an access token for the user that
grants them access to your App. The Realm SDK automatically manages access
tokens, refreshes them when they expire, and includes a valid access token for
the current user with each request. If you send requests outside of the SDK (for
example, through the GraphQL API) then you need to include the user's access
token with each request, and manually refresh the token when it expires.

You can access and refresh a logged in user's access token in the SDK from their
``Realm.User`` object, as in the following example: