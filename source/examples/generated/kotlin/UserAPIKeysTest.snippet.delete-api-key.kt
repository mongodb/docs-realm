val user = app.currentUser!!
val provider = user.apiKeyAuth

// Delete the specified API key
provider.delete(key.id)
