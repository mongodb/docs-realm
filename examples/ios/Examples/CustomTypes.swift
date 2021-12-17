import XCTest
import RealmSwift
import CoreLocation

// :code-block-start: custom-persistable-protocols
// Extend a type as a CustomPersistable if the conversion cannot fail.
extension CLLocationCoordinate2D: CustomPersistable {
    // :hide-start:
    public static func == (lhs: CLLocationCoordinate2D, rhs: CLLocationCoordinate2D) -> Bool {
        lhs.latitude == rhs.latitude && lhs.longitude == rhs.longitude
    }
    // :hide-end:
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
// :code-block-end:

// :code-block-start: use-custom-types-in-objects
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
    // :hide-start:
    convenience init(name: String, url: URL) {
        self.init()
        self.id = ObjectId()
        self.name = name
        self.url = url
    }

    convenience init(name: String, url: URL, location: CLLocationCoordinate2D) {
        self.init()
        self.id = ObjectId()
        self.name = name
        self.url = url
        self.location = location
    }
    // :hide-end:
}

public class Location: EmbeddedObject {
    @Persisted var latitude: Double
    @Persisted var longitude: Double
}
// :code-block-end:

class CustomTypes: XCTestCase {

    func testExample() {
        let realm = try! Realm()

        // :code-block-start: create-objects-with-custom-mapped-types
        // Initialize objects and assign values
        let club = CustomType_Club(value: ["name": "American Kennel Club", "url": "https://akc.org"])
        let club2 = CustomType_Club()
        club2.name = "Continental Kennel Club"
        // When assigning the value to a custom typed property, type safety
        // checks for the custom type you've mapped to a `persistableType`.
        club2.url = URL(string: "https://ckcusa.com/")!
        club2.location = CLLocationCoordinate2D(latitude: 40.7509, longitude: 73.9777)
        // :code-block-end:

        try! realm.write {
            realm.add(club)
            realm.add(club2)
        }

        // :code-block-start: query-objects-with-custom-mapped-types
        let akcClub = realm.objects(CustomType_Club.self).where {
            $0.name == "American Kennel Club"
        }.first!
        // You can use type-safe expressions to check for equality
        XCTAssert(akcClub.url == URL(string: "https://akc.org")!)

        let clubs = realm.objects(CustomType_Club.self)
        // You can use the persisted property type in NSPredicate query expressions
        let akcByUrl = clubs.filter("url == 'https://akc.org'").first!
        XCTAssert(akcByUrl.name == "American Kennel Club")
        // :code-block-end:

        try! realm.write {
            realm.deleteAll()
        }
    }
}
