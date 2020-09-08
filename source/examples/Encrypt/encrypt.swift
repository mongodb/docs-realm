// Generate a random encryption key
var key = Data(count: 64)
_ = key.withUnsafeMutableBytes { bytes in
    SecRandomCopyBytes(kSecRandomDefault, 64, bytes)
}

// Open the encrypted Realm file
let config = Realm.Configuration(encryptionKey: key)

do {
    let realm = try Realm(configuration: config)
    // Use the Realm as normal
    let dogs = realm.objects(Dog.self).filter("name contains 'Fido'")
    // ...

} catch let error as NSError {
    // If the encryption key is wrong, `error` will say that it's an invalid database
    fatalError("Error opening realm: \(error)")
}
