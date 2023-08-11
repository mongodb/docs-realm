// Log user in
val user = app.login(credentials)

// Work with logged-in user ...

// Close any user realms before deleting user
// Delete the logged-in user
user.delete()
