// Specify a baseURL to connect to a server other than the default.
// In this case, an Edge Server instance running on the device.
let configuration = AppConfiguration(baseURL: "http://localhost:80")
let app = App(id: YOUR_APP_SERVICES_APP_ID, configuration: configuration)

// ... log in a user and use the app...
// ... some time later...

try await app.updateBaseUrl(to: "https://services.cloud.mongodb.com")
