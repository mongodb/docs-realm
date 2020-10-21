import RealmSwift

// :code-block-start: person-model
class Person: Object {
    // Required string property
    @objc dynamic var name: String = ""

    // Optional string property
    @objc dynamic var address: String? = nil

    // Optional integral type property
    let age = RealmOptional<Int>()
}
// :code-block-end:
