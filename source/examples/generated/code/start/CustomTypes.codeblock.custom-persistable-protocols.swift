// Extend a type as a CustomPersistable if the conversion cannot fail.
extension CLLocationCoordinate2D: CustomPersistable {
    public typealias PersistedType = Location
    public init(persistedValue: PersistedType) {
        self.init(latitude: persistedValue.latitude, longitude: persistedValue.longitude)
    }
    public var persistableValue: PersistedType {
        Location(value: [self.latitude, self.longitude])
    }
}

// Extend a type as a FailableCustomPersistable if conversion can fail.
// This returns nil on read if the underlying column contains nil or
// something that can't be converted to the specified type.
extension URL: FailableCustomPersistable {
    public typealias PersistedType = String

    public init?(persistedValue: String) { self.init(string: persistedValue) }

    public var persistableValue: String { self.absoluteString }
}
