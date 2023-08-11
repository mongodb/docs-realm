// Log user in
val user = app.login(credentials)

// Work with logged-in user ...

// User can be logged out before being removed
user.logOut()

// Remove the user
// DOES NOT delete user from the server
user.remove()
