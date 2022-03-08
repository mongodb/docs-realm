class User: Object {
    @Persisted(primaryKey: true) var _id: String = ""
    @Persisted var name: String = ""
    @Persisted var memberOf: List<Project>
}
