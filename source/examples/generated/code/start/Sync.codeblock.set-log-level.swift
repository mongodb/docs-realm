// Access your app
let app = App(id: YOUR_REALM_APP_ID)

// Access the sync manager for the app
let syncManager = app.syncManager

// Set the logger to provide debug logs
syncManager.logLevel = .debug
