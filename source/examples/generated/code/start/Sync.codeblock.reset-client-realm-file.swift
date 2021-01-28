autoreleasepool {
    // all Realm usage here -- explicitly guarantee
    // that all realm objects are deallocated
    // before deleting the file
}
do {
    let app = App(id: YOUR_REALM_APP_ID)
    let user = app.currentUser
    let partitionValue = "some partition value"
    var configuration = user!.configuration(partitionValue: partitionValue)
    configuration.objectTypes = [Task.self]
    _ = try Realm.deleteFiles(for: configuration)
} catch {
    // handle error
}
