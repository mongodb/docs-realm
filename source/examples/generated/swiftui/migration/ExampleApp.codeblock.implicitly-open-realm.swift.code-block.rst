.. code-block:: swift
   :emphasize-lines: 3

   struct LocalOnlyContentView: View {
       @State var searchFilter: String = ""
       @ObservedResults(Group.self) var groups
       
       var body: some View {
           if let group = groups.first {
               // Pass the Group objects to a view further
               // down the hierarchy
               ItemsView(group: group, searchFilter: $searchFilter)
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

   }
