// :replace-start: {
//   "terms": {
//     "SwiftUI_": ""
//   }
// }
import RealmSwift
import SwiftUI

// :snippet-start: searchable
struct SearchableDogsView: View {
    @ObservedResults(SwiftUI_Dog.self) var dogs
    @State private var searchFilter = ""
    
    var body: some View {
        NavigationView {
            // The list shows the dogs in the realm.
            List {
                ForEach(dogs) { dog in
                    DogRow(dog: dog)
                }
            }
            .searchable(text: $searchFilter,
                        collection: $dogs,
                        keyPath: \.name) {
                ForEach(dogs) { dogsFiltered in
                    Text(dogsFiltered.name).searchCompletion(dogsFiltered.name)
                }
            }
        }
    }
}
// :snippet-end:

// :snippet-start: nspredicate-filter
struct FilterDogsViewNSPredicate: View {
    @ObservedResults(SwiftUI_Dog.self, filter: NSPredicate(format: "weight > 40")) var dogs
    
    var body: some View {
        NavigationView {
            // The list shows the dogs in the realm.
            List {
                ForEach(dogs) { dog in
                    DogRow(dog: dog)
                }
            }
        }
    }
}
// :snippet-end:

// :snippet-start: type-safe-query-filter
struct FilterDogsViewTypeSafeQuery: View {
    @ObservedResults(SwiftUI_Dog.self, where: ( { $0.weight > 40 } )) var dogs
    
    var body: some View {
        NavigationView {
            // The list shows the dogs in the realm.
            List {
                ForEach(dogs) { dog in
                    DogRow(dog: dog)
                }
            }
        }
    }
}
// :snippet-end:

// :replace-end:
