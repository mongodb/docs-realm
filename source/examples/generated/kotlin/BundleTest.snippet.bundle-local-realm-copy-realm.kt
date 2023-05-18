// Copy the realm data
originalRealm.writeCopyTo(copyConfig)

// Get the path to the copy you just created.
// You must move this file into the appropriate location for your app's platform.
Log.v("Bundled realm location: ${copyConfig.path}")

originalRealm.close()
