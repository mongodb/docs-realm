val user = app.currentUser!!
val provider = user.apiKeyAuth

// Delete the specified API key
// Once deleted, keys cannot be recovered
provider.delete(key.id)
