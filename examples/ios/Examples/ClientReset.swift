// :replace-start: {
//   "terms": {
//     "ClientReset_": ""
//   }
// }
import XCTest
import RealmSwift

class ClientReset_Dog: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
}

class ClientReset: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testSpecifyClientResetMode() async {
        // :code-block-start: before-client-reset-block
        let beforeClientResetBlock: (Realm) -> Void = { beforeRealm in
            /* This block could be used to back-up a realm file, send reporting, etc. */
            // For example, you might copy the realm to a specific path
            // to perform recovery after the client reset is complete.
            let outputDir = try! FileManager.default.url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
            // Append a file name to complete the path
            let myRecoveryPath = outputDir.appendingPathComponent("backup.realm")
            var recoveryConfig = Realm.Configuration()
            recoveryConfig.fileURL = myRecoveryPath

            // Check to see if there is already a realm at the recovery file path. If there
            // is already a realm there, delete it.
            if Realm.fileExists(for: recoveryConfig) {
                do {
                    try Realm.deleteFiles(for: recoveryConfig)
                    print("Successfully deleted existing realm at path: \(myRecoveryPath)")
                } catch {
                    print("Error deleting realm: \(error.localizedDescription)")
                }
            } else {
                print("No file currently exists at path")
            }

            // Try to copy the realm to the specified path.
            do {
                try beforeRealm.writeCopy(configuration: recoveryConfig)
            } catch {
                print("Error copying realm: \(error.localizedDescription)")
            }
        }
        // :code-block-end:
        // :code-block-start: after-client-reset-block
        let afterClientResetBlock: (Realm, Realm) -> Void = { before, after in
        /* This block could be used to add custom recovery logic, back-up a realm file, send reporting, etc. */
            // This is one example of how you might implement custom recovery logic to avoid losing local changes.
            // Iterate through every object of the `Dog` type in the pre-client-reset realm file
            for object in before.objects(ClientReset_Dog.self) {
                // Get the set of `Dog` type objects from the new post-client reset realm
                let objectsAfterReset = after.objects(ClientReset_Dog.self)
                // Check to see if the specific dog object from before the client
                // reset is also in the post-client-reset realm
                let objectInBothSets = objectsAfterReset.where {
                    $0._id == object._id
                }
                // If the object existed before and after the client reset,
                // perform custom recovery, such as applying any local changes
                // to the object in the new realm.
                if objectInBothSets.first != nil {
                     /* ...custom recovery logic... */
                } else {
                     /* ...custom recovery logic... */
                }
            }
        }
        // :code-block-end:
        do {
            let app = App(id: YOUR_REALM_APP_ID)
            let user = try await app.login(credentials: Credentials.anonymous)
            // :code-block-start: specify-client-reset-mode
            // Specify the clientResetMode when you create the SyncConfiguration.
            // If you do not specify, this defaults to `.manual` mode.
            var configuration = user.configuration(partitionValue: "myPartition", clientResetMode: .discardLocal(beforeClientResetBlock, afterClientResetBlock))
            // :code-block-end:
        } catch {
            print("Error logging in user: \(error.localizedDescription)")
        }
    }
}
// :replace-end:
