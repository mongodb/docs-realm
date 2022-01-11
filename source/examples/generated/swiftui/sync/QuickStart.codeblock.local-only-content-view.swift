/// The main content view if not using Sync.
struct LocalOnlyContentView: View {
    // Implicitly use the default realm's objects(Group.self)
    @ObservedResults(Group.self) var groups
    
    var body: some View {
        if let group = groups.first {
            // Pass the Group objects to a view further
            // down the hierarchy
            ItemsView(group: group)
        } else {
            // For this small app, we only want one group in the realm.
            // You can expand this app to support multiple groups.
            // For now, if there is no group, add one here.
            ProgressView().onAppear {
                $groups.append(Group())
            }
        }
    }
}
