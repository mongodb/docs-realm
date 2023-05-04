// Access your app
let app = App(id: YOUR_APP_SERVICES_APP_ID)

// Create an instance of `Logger` and define the log function to invoke.
let logger = Logger(level: .detail) { level, message in
    "REALM DEBUG: \(Date.now) \(level) \(message) \n"
}
