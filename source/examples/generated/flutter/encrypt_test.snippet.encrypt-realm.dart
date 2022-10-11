// Generate encryption key. Encryption keys must be a 64-byte
List<int> key = List<int>.generate(64, (i) => Random().nextInt(256));

Configuration encryptedConfig = Configuration.local([Car.schema],
    encryptionKey: key, path: 'encrypted.realm');
Realm encryptedRealm = Realm(encryptedConfig);
