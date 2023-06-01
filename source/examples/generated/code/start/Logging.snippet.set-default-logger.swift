let logger = Logger(level: .info) { level, message in
    "REALM DEBUG: \(Date.now) \(level) \(message) \n"
}

// Set a logger as the default
Logger.shared = logger

// After setting a default logger, you can change
// the log level at any point during the app lifecycle
Logger.shared.level = .debug
