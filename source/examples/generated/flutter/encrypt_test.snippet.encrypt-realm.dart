// Generate encryption key
List<int> key = List<int>.generate(64, (i) => Random().nextInt(256));

Configuration encryptedConfig = Configuration.local([Car.schema],
    encryptionKey: key, path: 'encrypted.realm');
Realm encryptedRealm = Realm(encryptedConfig);
