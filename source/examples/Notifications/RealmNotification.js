// Define a listener callback function
function onRealmChange() {
  console.log("Something changed!")
}

// Add the listener callback to the realm
realm.addListener('change', onRealmChange);

// Remember to remove the listener when you're done!
realm.removeListener('change', onRealmChange);
