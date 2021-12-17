class CustomType_Club: Object {
    @Persisted var id: ObjectId
    @Persisted var name: String
    // Since we declared the URL as a FailableCustomPersistable,
    // it must be optional.
    @Persisted var url: URL?
    // Here, the `location` property maps to an embedded object.
    // We can declare the property as required.
    // If the underlying field contains nil, this uses
    // a default-constructed object.
    @Persisted var location: CLLocationCoordinate2D
}

public class Location: EmbeddedObject {
    @Persisted var latitude: Double
    @Persisted var longitude: Double
}
