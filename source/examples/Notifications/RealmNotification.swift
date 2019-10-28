// Observe realm notifications. Keep a strong reference to the notification token
// or the observation will stop.
let token = realm.observe { notification, realm in
    viewController.updateUI()
}

// later
token.invalidate()
