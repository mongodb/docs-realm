autoreleasepool {
    // all Realm usage here -- explicitly guarantee
    // that all realm objects are deallocated
    // before deleting the files
}
do {
    let app = App(id: YOUR_REALM_APP_ID)
    var configuration = app.currentUser!.configuration(partitionValue: "some partition value")
    _ = try Realm.deleteFiles(for: configuration)
} catch {
    // handle error
}
