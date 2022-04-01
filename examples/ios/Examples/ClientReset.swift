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
        // :code-block-start: client-reset-discard-changes-with-blocks
        let beforeClientResetBlock: (Realm) -> Void = { beforeRealm in
            // This block could be used to back-up a realm file, send reporting, etc.
        }

        let afterClientResetBlock: (Realm, Realm) -> Void = { before, after in
            // This block could be used to add custom recovery logic, send reporting, etc.
        }

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
        // :code-block-end:
    }
}
// :replace-end:
