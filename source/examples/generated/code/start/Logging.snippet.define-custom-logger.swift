// Create an instance of `Logger` and define the log function to invoke.
let logger = Logger(level: .detail) { level, message in
    "REALM DEBUG: \(Date.now) \(level) \(message) \n"
}
