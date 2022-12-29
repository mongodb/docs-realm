// Gets a refreshed access token for the user
fun refreshAccessToken(): String {
    return user.refreshToken
}
// Access token is removed after user logs out
user.logOut()
