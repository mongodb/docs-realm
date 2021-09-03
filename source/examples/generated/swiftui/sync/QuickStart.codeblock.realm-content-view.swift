// The view for opening a realm and setting up a group
struct RealmContentView: View {
    
    // Observe a realm that may be opened after login.
    @State var realm: Realm?
    
    var body: AnyView {
        // If logged in but the realm is not open yet, then show a progress spinner
        // while opening the realm. Realm.asyncOpen() downloads the remote changes before
        // the realm opens, which might take a moment.
        guard let realm = realm else {
            return AnyView(ProgressView() // Show the activity indicator while the realm loads
                            .onReceive(Realm.asyncOpen(configuration: app!.currentUser!.configuration(partitionValue: app!.currentUser!.id)).assertNoFailure()) { realm in
                    // Preload one group if it does not exist. This app only ever allows
                    // one group per user partition, but you could expand it to allow many groups.
                    if realm.objects(Group.self).count == 0 {
                        try! realm.write {
                            realm.add(Group())
                        }
                    }
                    // Assign the realm to the state property to trigger a view refresh.
                    self.realm = realm
                })
        }
        // If logged in and the realm has been opened, then go to the items
        // screen for the only group in the realm.
        return AnyView(ItemsView(group: realm.objects(Group.self).first!,
                                 leadingBarButton: AnyView(LogoutButton(app: app!))))
        // Pass the app to descendents via this environment object.
    }
}
