let app = App(id: APPID)
let user = try await app.login(credentials: Credentials.anonymous)
var config = user.flexibleSyncConfiguration()
// Pass object types to the Flexible Sync configuration
// as a temporary workaround for not being able to add complete schema
// for a Flexible Sync app
config.objectTypes = [Task.self, Team.self]
let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
