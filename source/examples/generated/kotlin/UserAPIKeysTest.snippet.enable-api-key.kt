val user = app.currentUser!!
val provider = user.apiKeyAuth

// Enable a specified API key that's currently disabled
provider.enable(key.id)

// Disable a specified API key that's currently enabled
provider.disable(key.id)
