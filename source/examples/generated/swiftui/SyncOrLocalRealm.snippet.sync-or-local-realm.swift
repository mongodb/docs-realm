struct FlexibleSyncOrLocalRealmView: View {
    var app: RealmSwift.App?
    
    var body: some View {
        // Using Sync?
        if let app = app {
            FlexibleSyncContentView(flexibleSyncApp: app)
        } else {
            LocalOnlyContentView()
                .environment(\.realmConfiguration, config)
        }
    }
}
