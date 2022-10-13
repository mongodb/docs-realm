// Generate encryption key
List<int> key = List<int>.generate(64, (i) => Random().nextInt(256));

Configuration encryptedConfig = Configuration.local([Car.schema],
    // Include the encryption key in the configuration
    encryptionKey: key);
Realm encryptedRealm = Realm(encryptedConfig);
