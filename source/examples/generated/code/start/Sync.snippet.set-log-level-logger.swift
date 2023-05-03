// Access your app
let app = App(id: YOUR_APP_SERVICES_APP_ID)

var logs: String = ""

// Create an instance of `Logger` and define the log function to invoke.
let logger = Logger(level: .detail) { level, message in
    logs += "\(Date.now) \(level) \(message) \n"
}
