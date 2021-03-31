let realm = try! Realm()

// Get the realm file's parent directory
let folderPath = realm.configuration.fileURL!.deletingLastPathComponent().path

// Disable file protection for this directory
try! FileManager.default.setAttributes([FileAttributeKey.protectionKey: FileProtectionType.none],
                                       ofItemAtPath: folderPath)
