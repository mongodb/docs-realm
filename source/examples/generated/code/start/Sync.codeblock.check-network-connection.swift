// Read connectionState directly from syncSession
let connectionState = syncSession.connectionState

// Observe connectionState for changes using KVO
let observer = syncSession.observe(\.connectionState, options: [.initial]) { (syncSession, change) in
    switch syncSession.connectionState {
    case .connecting:
        print("Connecting...")
    case .connected:
        print("Connected")
    case .disconnected:
        print("Disconnected")
    default:
        break
    }
}
