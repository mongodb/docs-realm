function updateUI() {
  // ... handle update to the UI ...
}

// Observe realm notifications.
realm.addListener('change', updateUI);

// ..later remove the listener
realm.removeListener('change', updateUI);

// ..or unregister all listeners
realm.removeAllListeners();
