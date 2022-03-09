// Observe realm notifications. Keep a strong reference to the notification token
// or the observation will stop.
let token = realm.observe { notification, realm in
    // `notification` is an enum specifying what kind of notification was emitted.
    // See https://realm.io/docs/swift/latest/api/Classes/Realm.html#/s:10RealmSwift0A0C12NotificationO
    // for details.
    viewController.updateUI()
}

// Later, explicitly stop observing.
token.invalidate()
