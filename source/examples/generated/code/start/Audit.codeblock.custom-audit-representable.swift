// To customize audit event serialization, your object must
// conform to the `CustomAuditRepresentable` protocol.
class Person: Object, CustomAuditRepresentable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var employeeId: Int
    @Persisted var userId: String?

    convenience init(name: String, employeeId: Int) {
        self.init()
        self.name = name
        self.employeeId = employeeId
    }
    
    // To conform to `CustomAuditRepresentable`, your object
    // must implement a `customAuditRepresentation` func that
    // defines your customized audit event serialization
    func customAuditRepresentation() -> String {
        if employeeId == 0 {
            return "invalid json"
        }
        return "{\"int\": \(employeeId)}"
    }
}
