extension Realm {
    func writeAsync<T: ThreadConfined>(_ passedObject: T, errorHandler: @escaping ((_ error: Swift.Error) -> Void) = { _ in return }, block: @escaping ((Realm, T?) -> Void)) {
        let objectReference = ThreadSafeReference(to: passedObject)
        let configuration = self.configuration
        DispatchQueue(label: "background").async {
            autoreleasepool {
                do {
                    let realm = try Realm(configuration: configuration)
                    let object = realm.resolve(objectReference)
                    try realm.write {
                        block(realm, object)
                    }
                } catch {
                    errorHandler(error)
                }
            }
        }
    }
}
