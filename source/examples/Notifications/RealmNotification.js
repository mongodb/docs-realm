function updateUI() {
  // ...
}

// Observe Realm Notifications
realm.addListener('change', updateUI);

// ..later remove the listener
realm.removeListener('change', updateUI);

// ..or unregister all listeners
realm.removeAllListeners();
