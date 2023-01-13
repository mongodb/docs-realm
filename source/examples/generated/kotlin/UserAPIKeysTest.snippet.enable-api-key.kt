val user = app.currentUser!!
val provider = user.apiKeyAuth

// Enable a specified API key
provider.enable(key.id)

// Disable a specified API key
provider.disable(key.id)
